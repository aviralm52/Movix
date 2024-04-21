import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayBtn } from "../PlayBtn.jsx";
import { BsClockFill } from "react-icons/bs";
import VideoPopup from "../../../components/videoPopups/VideoPopups.jsx";
import MediaReviews from "../../../components/mediaReviews/MediaReviews.jsx";
import avatar from "../../../assets/avatar.png"

const DetailsBanner = ({ video, crew }) => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const { data: reviews, loading: reviewsLoading } = useFetch(
        `/${mediaType}/${id}/reviews`
    );
    const { url } = useSelector((store) => store.home);
    const _genres = data?.genres?.map((g) => g.id); //! genres for each movie

    const director = crew?.filter((d) => d.job == "Director");
    const writer = crew?.filter(
        (w) => w.job === "Screenplay" || w.job === "Story" || w.job === "Writer"
    );

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    //* MY PART
    const [genreStyleForDetailsBanner, setGenreStyleForDetailsBanner] =
        useState(true);
    const [
        circularProgressForDetailsBanner,
        setCircularProgressForDetailsBanner,
    ] = useState(true);
    //*

    const [showVideo, setShowVideo] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const handlePlayVideo = () => {
        setShowVideo(true);
        setVideoId(video?.key);
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    <div>
                        <div className="backdrop-img">
                            <Img src={url.backdrop + data?.backdrop_path} />
                        </div>
                        <div className="opacity-layer"></div>
                        <ContentWrapper>
                            <div className="content ">
                                <div className="left">
                                    {data?.poster_path ? (
                                        <Img
                                            className="posterImg"
                                            src={url.poster + data.poster_path}
                                        />
                                    ) : (
                                        <Img
                                            className="posterImg"
                                            src={PosterFallback}
                                        />
                                    )}
                                </div>
                                <div className="right">
                                    <div className="title">
                                        {`${data?.name || data?.title} (${dayjs(data?.release_date).format("YYYY")})`}
                                    </div>
                                    <div className="subtitle">
                                        {data?.tagline}
                                    </div>
                                    <Genres
                                        genre_ids={_genres}
                                        genreStyleForDetailsBanner={
                                            genreStyleForDetailsBanner
                                        }
                                    />
                                    <div className="row">
                                        <CircleRating
                                            rating={data?.vote_average.toFixed(
                                                1
                                            )}
                                            circularProgressForDetailsBanner={
                                                circularProgressForDetailsBanner
                                            }
                                        />
                                        <div
                                            className="playbtn"
                                            onClick={handlePlayVideo}
                                        >
                                            <PlayBtn />
                                            <span className="text">
                                                Watch Video
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overview">
                                        <div className="heading">Overview</div>
                                        <div className="description">
                                            {data?.overview}
                                        </div>
                                    </div>
                                    <div className="info">
                                        {data?.status && (
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Status:
                                                </span>
                                                <span className="text">
                                                    {data?.status}
                                                </span>
                                            </div>
                                        )}
                                        {data?.release_date && (
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Release Date:
                                                </span>
                                                <span className="text">
                                                    {dayjs(
                                                        data?.release_date
                                                    ).format("MMM D, YYYY")}
                                                </span>
                                            </div>
                                        )}
                                        {data?.runtime && (
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Runtime:
                                                </span>
                                                <span className="text">
                                                    {toHoursAndMinutes(
                                                        data?.runtime
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {director?.length > 0 && ( //! Director
                                        <div className="info">
                                            <span className="text bold">
                                                Director:
                                            </span>
                                            <span className="text">
                                                {director?.map((d, i) => (
                                                    <span
                                                        key={i}
                                                        className="text"
                                                    >
                                                        {d.name}
                                                        {director.length - 1 !==
                                                            i && ", "}
                                                    </span>
                                                ))}
                                            </span>
                                        </div>
                                    )}
                                    {writer?.length > 0 && ( //! Writer
                                        <div className="info">
                                            <span className="text bold">
                                                Writer:
                                            </span>
                                            <span className="text">
                                                {writer?.map((w, i) => (
                                                    <span
                                                        key={i}
                                                        className="text"
                                                    >
                                                        {w.name}
                                                        {writer.length - 1 !==
                                                            i && ", "}
                                                    </span>
                                                ))}
                                            </span>
                                        </div>
                                    )}
                                    {data?.created_by?.length > 0 && ( //! Creator in case of TV Series
                                        <div className="info">
                                            <span className="text bold">
                                                Creators:
                                            </span>
                                            <span className="text">
                                                {data?.created_by?.map(
                                                    (c, i) => (
                                                        <span
                                                            key={i}
                                                            className="text"
                                                        >
                                                            {c.name}
                                                            {data?.created_by
                                                                .length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    )
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <VideoPopup
                                showVideo={showVideo}
                                setShowVideo={setShowVideo}
                                videoId={videoId}
                                setVideoId={setVideoId}
                            />
                        </ContentWrapper>
                    </div>
                    <div className="reviewsSideBar h-[850px] w-[500px] absolute right-32 -bottom-[1880px] text-white text-2xl text-left p-2 overflow-auto">
                        {reviews?.results.map((review, index) => {
                            return <MediaReviews review={review} />
                        })}
                    </div>
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
