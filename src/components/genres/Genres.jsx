import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const Genres = ({ genre_ids, genreStyleForDetailsBanner = false }) => {
    const { genres } = useSelector((store) => store.home);
    // console.log("genres: ", genres); // Object {}
    // console.log("genre_ids: ", genre_ids); // [38, 57, 10157]

    return (
        <div className={`genres ${genreStyleForDetailsBanner ? "DetailsComponentGenre" : ""}`}>
                {genre_ids?.map((g) => {
                    if (!genres[g]?.name) return;
                    return (
                        <div key={g} className="genre">
                            {genres[g]?.name}
                        </div>
                    );
                })}
        </div>
    );
};

export default Genres;
