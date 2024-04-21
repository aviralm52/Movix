import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );
    const title =
        mediaType === "tv" ? "Recommended TV Shows" : "Recommended Movies";
    return (
        <div>
            {   data?.results?.length > 0 &&
                <Carousel
                    title="Recommendations"
                    data={data?.results}
                    loading={loading}
                    endpoint={mediaType}
                />
            }
        </div>
    );
};

export default Recommendation;
