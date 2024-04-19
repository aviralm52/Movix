import React from "react";
import ReactPlayer from "react-player/youtube";

import "./style.scss";

const VideoPopup = ({ showVideo, setShowVideo, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShowVideo(false);
        setVideoId(null);
    };
    return (
        <div className={`videoPopup ${showVideo ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;