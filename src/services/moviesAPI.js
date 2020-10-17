import axios from "axios";
const baseURL = "https://api.themoviedb.org/3";
const key = "fed6793f52ec0d228866e352cbff29a4";

const fetchMovieCasts = (movieId) => {
  return axios
    .get(`${baseURL}/movie/${movieId}/credits?api_key=${key}`)
    .then((res) => res.data.cast);
};
const fetchMovieReviews = (movieId) => {
  return axios
    .get(
      `${baseURL}/movie/${movieId}/reviews?api_key=${key}&language=en-US&page=1`
    )
    .then((res) => res.data.results);
};

const fetchMovieDetails = (movieID) => {
  return axios.get(`${baseURL}/movie/${movieID}?api_key=${key}&language=en-US`);
};
const fetchMoviesWithQuery = (searchQuery, page = 1) => {
  return axios
    .get(
      `${baseURL}/search/movie?api_key=${key}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`
    )
    .then((res) => res.data.results);
};
const fetchMoviesPopular = () => {
  return axios
    .get(`${baseURL}/trending/movie/day?api_key=${key}`)
    .then((res) => res.data.results);
};
export default {
  fetchMoviesWithQuery,
  fetchMovieDetails,
  fetchMoviesPopular,
  fetchMovieReviews,
  fetchMovieCasts,
};
