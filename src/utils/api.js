import axios from "axios";

// const BASE_URL = "https://api.themoviedb.org/3/search/movie?query=Batman&callback=test"
const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;     //! importing token from .env file
// const TMDB_TOKEN =
//     "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjQwYTNjMmI0MGVjZmEyZWJmOTkxZWQ4YTg2NWNmOSIsInN1YiI6IjY0YTc0MTVkZjA1NmQ1MDExY2FhMmFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FO9bMvv5ndRsf8Nsp8Nrv6UtgBYVgSBlKW6I7eJUENw"

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromAPI = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers: headers,
            params: params,
        });
        return data;
    } catch (error) {
        console.log("Inside api.js file: ",error);
        return error;
    }
};
