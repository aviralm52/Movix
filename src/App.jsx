import { useEffect } from "react";
import "./App.css";
import { fetchDataFromAPI } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "./store/HomeSlice";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
    const homeSliceInstance = useSelector((store) => store.home);
    const dispatch = useDispatch();

    const fetchAPIConfig = () => {
        fetchDataFromAPI("/configuration").then((res) => {
            const url = {
                backdrop: res.images?.secure_base_url + "original",
                poster: res.images?.secure_base_url + "original",
                profile: res.images?.secure_base_url + "original",
                avatar: 'https://image.tmdb.org/t/p/w185/'
            }
            dispatch(homeActions.getApiConfiguration(url));
        });
    };


    const genresCall = async () => {
        let promises = [];
        let endPoints = ['tv', 'movie']
        let allGenres = {}

        endPoints.forEach((endPoint) => {
            promises.push(fetchDataFromAPI(`/genre/${endPoint}/list`));
        })

        const data = await Promise.all(promises);
        data.map(({genres}) => {
            return (
                genres.map((item) => allGenres[item.id] = item)
            )
        })
        dispatch(homeActions.getGenres(allGenres));
    }


    useEffect(() => {
        fetchAPIConfig();
        genresCall();
    }, []);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
