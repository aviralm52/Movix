import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((store) => store.home);

    const { data, loading } = useFetch("/trending/all/week");

    useEffect(() => {
        const randomNum = Math.floor(Math.random() * 20);

        const randomBg =
            url.backdrop + data?.results?.[randomNum]?.backdrop_path;
        setBackground(randomBg);

        // ! This part will log the title of the poster in console, it has no effect on the app
        // if (data?.results?.[randomNum].title !== undefined)
        //     console.log("Post Title: ", data?.results?.[randomNum].title);
        // else if (data?.results?.[randomNum].name !== undefined)
        //     console.log("Post Name: ", data?.results?.[randomNum].name);
    }, [data]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`search/${query}`);
        }else if(event.type === 'click'){
            navigate(`search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="wrapper ">
                    <div className="heroBannerContent ">
                        <span className="title ">Welcome</span>
                        <span className="subTitle">
                            Millions of movies, TV shows and people to discover.
                            Explore now.
                        </span>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show..."
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                onKeyUp={searchQueryHandler}
                            />
                            <button onClick={searchQueryHandler}>Search</button>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;

// TODO: Change the background poster image of the page each time on reload
