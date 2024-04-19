import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ media_type, id }) => {
    const { data, loading, error } = useFetch(
        `/${media_type}/${id}/recommendations`
    );
    const title =
        media_type === "tv" ? "Recommended TV Shows" : "Recommended Movies";
    console.log("data: ", data);
    return (
        <div>
            {   data?.results?.length > 0 &&
                <Carousel
                    title="Recommendations"
                    data={data?.results}
                    loading={loading}
                    endpoint={media_type}
                />
            }
        </div>
    );
};

export default Recommendation;
