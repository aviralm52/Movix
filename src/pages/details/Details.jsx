import React from "react";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import { useFetcher, useParams } from "react-router-dom";
import Cast from "./cast/Cast";
import VideosSection from "../details/videosSection/VideosSection"
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation"

const Details = () => {

    const {media_type, id} = useParams();
    const {data, loading} = useFetch(`/${media_type}/${id}/videos`);
    const {data: credits, loading: creditsLoading} = useFetch(`/${media_type}/${id}/credits`);

    return (
        <div >
            <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>
            <Cast data={credits?.cast} loading={creditsLoading}/>
            <VideosSection data={data?.results} loading={loading}/>
            <Similar media_type={media_type} id={id}/>
            <Recommendation media_type={media_type} id={id}/>
        </div>
    );
};

export default Details;
