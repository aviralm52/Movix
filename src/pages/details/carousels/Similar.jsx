import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ media_type, id }) => {
    const { data, loading, error } = useFetch(`/${media_type}/${id}/similar`);

    const title = media_type === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <div>
            {   data?.results?.length >0 &&
                <Carousel
                    title={title}
                    data={data?.results}
                    loading={loading}
                    endPoint={media_type}
                />
            }
        </div>
    );
};

export default Similar;
