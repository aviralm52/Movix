import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayBtn } from "../PlayBtn";
import VideoPopup from "../../../components/videoPopups/VideoPopups";
import Img from "../../../components/lazyLoadImage/Img";

const VideosSection = ({ data, loading }) => {
    const [showVideo, setShowVideo] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const handlePlayVideo = (key) => {
        setShowVideo(true);
        setVideoId(key);
    };

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.map((video) => (
                            <div
                                key={video.id}
                                className="videoItem"
                                onClick={() => {
                                    handlePlayVideo(video.key);
                                }}
                            >
                                <div className="videoThumbnail">
                                    <Img
                                        src={`http://i3.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                                    />
                                    <PlayBtn />
                                </div>
                            <div className="videoTitle">
                                    {video.name}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                showVideo={showVideo}
                setShowVideo={setShowVideo}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;
