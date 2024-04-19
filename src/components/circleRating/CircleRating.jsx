import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const CircleRating = ({ rating, circularProgressForDetailsBanner=false }) => {
    return (
        <CircularProgressbar
            value={rating}
            maxValue={10} //! if we don't give maxValue it will calculate % from 100
            text={rating}
            className={`circle ${circularProgressForDetailsBanner ? "circleForDetailsBanner" : ""}`}
            styles={buildStyles({
                textColor: "white",
                pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                textSize: "30px",
            })}
        />
    );
};

export default CircleRating;
