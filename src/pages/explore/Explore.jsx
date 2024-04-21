import React, { useEffect, useState } from "react";
import "./style.scss";
import { useAsyncError, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Carousel from "../../components/carousel/Carousel";
import MovieCard from "../../components/movieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../components/spinner/Spinner";
import { fetchDataFromAPI } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { GoMoveToTop } from "react-icons/go";
import Select from "react-select";

let filters = {}; //! This object will be passed as parameter while making api call

const Explore = () => {
    const { mediaType } = useParams();
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);

    const { data: genreData } = useFetch(`/genre/${mediaType}/list`);

    const sortbyData = [
        { value: "popularity.desc", label: "Popularity Descending" },
        { value: "popularity.asc", label: "Popularity Ascending" },
        { value: "vote_average.desc", label: "Rating Descending" },
        { value: "vote_average.asc", label: "Rating Ascending" },
        {
            value: "primary_release_date.desc",
            label: "Release Date Descending",
        },
        { value: "primary_release_date.asc", label: "Release Date Ascending" },
        { value: "original_title.asc", label: "Title (A-Z)" },
    ];

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromAPI(`/discover/${mediaType}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFromAPI(
            `/discover/${mediaType}?page=${pageNum}`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res?.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        (filters = {}), setData(null), setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);

    const title = mediaType === "tv" ? "TV Show" : "Movie";

    const handleChange = (selectedItems, actions) => {

        if (actions.name === "genres") {
            setGenre(selectedItems);
            if (actions.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }
        if (actions.name === "sortBy") {
            setSortby(selectedItems);
            if (actions.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }
        setPageNum(1);
        fetchInitialData(filters);
    };

    return (
        <div className="explorePage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    <>
                        <div className="flex justify-between exploreHeader">
                            <div className="pageTitle">
                                {data?.results.length > 0
                                    ? `${title}s`
                                    : `${title}`}
                            </div>
                            <div className="flex gap-8 selectDiv">
                                <Select
                                    name="genres"
                                    value={genre}
                                    options={genreData?.genres}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    isMulti={true}
                                    onChange={handleChange}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                                <Select
                                    name="sortBy"
                                    value={sortby}
                                    placeholder="Sort by"
                                    options={sortbyData}
                                    onChange={handleChange}
                                    isClearable={true}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>
                        </div>
                        {data?.results.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            // fromSearch={true}   // it will hide the circle rating
                                            fromSearch={false}
                                            // mediaType={item?.media_type}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Result not found
                            </span>
                        )}
                        <div
                            className="temp moveToTop fixed hover:cursor-pointer scroll-smooth"
                            onClick={() =>
                                window.scroll({ top: 0, behavior: "smooth" })
                            }
                        >
                            <GoMoveToTop className="arrow" />
                        </div>
                    </>
                </ContentWrapper>
            )}
        </div>
    );
};

export default Explore;
