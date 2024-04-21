import React, { useEffect, useState } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { fetchDataFromAPI } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { GoMoveToTop } from "react-icons/go";

const SearchResult = () => {
    // console.log("query: ", query);
    // const str = `/search/${query}?page=1`;
    // console.log(str);
    // const {data, loading, error} = useFetch(`/search/movie?query=${query}`);
    // console.log("data: ", data);

    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                // setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
        setPageNum((prev) => prev + 1);
    };

    const fetchNextPageData = () => {
        fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res?.results],
                    });
                } else {
                    setData(res);
                }
                // setPageNum((prev) => prev + 1);
            }
        );
        setPageNum((prev) => prev + 1);
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <div className="smoothScrollDiv">
            <div className="searchResultsPage">
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <ContentWrapper>
                        {data?.results.length > 0 ? (
                            <>
                                <div className="pageTitle">
                                    {`Search ${data?.total_results > 1 ? "results" : "result"} for '${query}'`}
                                </div>
                                <InfiniteScroll
                                    className="content"
                                    dataLength={data?.results?.length || []}
                                    next={fetchNextPageData}
                                    hasMore={pageNum <= data?.total_pages}
                                    loader={<Spinner />}
                                >
                                    {data?.results?.map((item, index) => {
                                        if (item.mediaType === "person")
                                            return;
                                        return (
                                            <MovieCard
                                                key={index}
                                                data={item}
                                                fromSearch={true}
                                                mediaType={item.media_type}
                                            />
                                        );
                                    })}
                                </InfiniteScroll>
                            </>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Result not found
                            </span>
                        )}
                    </ContentWrapper>
                )}
            </div>
            <div className="temp bg-slate-700 text-white text-3xl w-8 h-8 fixed bottom-72 right-12 hover:cursor-pointer scroll-smooth" onClick={() => window.scroll({top:0, behavior:"smooth"})}>
                <GoMoveToTop/>
            </div>
        </div>
    );
};

export default SearchResult;
