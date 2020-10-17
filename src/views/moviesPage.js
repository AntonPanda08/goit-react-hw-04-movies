import React, { Component } from "react";
import SearchBar from "../components/searchBar";
import moviesAPI from "../services/moviesAPI";
import MovieGallery from "../components/movieGallery";
import MovieGalleryItem from "../components/movieItem";
import Error from "../components/error";
import LoadMoreButton from "../components/loadMoreButton";
import Spinner from "../components/loader";
import getQueryStringParams from "../utils/getQueryString";
export default class MoviesPage extends Component {
  state = {
    movies: [],
    loading: false,
    error: null,
    searchQuery: "",
    page: 1,
  };
  componentDidMount() {
    const { page } = this.state;
    const { query } = getQueryStringParams(this.props.location.search);
    if (query) {
      this.setState({
        loading: true,
      });
      this.handleFetchMovies(query, page);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryStringParams(
      prevProps.location.search
    );
    const { query: nextQuery } = getQueryStringParams(
      this.props.location.search
    );
    const prevMovies = prevState.movies;
    const nextMovies = this.state.movies;
    if (prevQuery !== nextQuery) {
      this.fetchMovies();
    }
    if (prevMovies !== nextMovies) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }
  fetchMovies = () => {
    const { searchQuery, page } = this.state;
    this.setState({
      loading: true,
    });
    this.handleFetchMovies(searchQuery, page);
  };
  handleSearchSubmit = (query) => {
    this.setState({
      searchQuery: query,
      page: 1,
      movies: [],
    });
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };
  handleFetchMovies = (query, page) => {
    moviesAPI
      .fetchMoviesWithQuery(query, page)
      .then((movies) =>
        this.setState((prevState) => ({
          movies: [...prevState.movies, ...movies],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };
  render() {
    const { movies, error, loading } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        {error && <Error message={`OOPS: ${error.message}`} />}
        {loading && <Spinner />}
        {movies.length > 0 && (
          <>
            <MovieGallery>
              {movies.map((movie) => (
                <MovieGalleryItem
                  location={this.props.location}
                  id={movie.id}
                  key={movie.id}
                  original_title={movie.original_title}
                />
              ))}
            </MovieGallery>
            {movies.length > 0 && !loading && (
              <LoadMoreButton handleClick={this.fetchMovies} />
            )}
          </>
        )}
      </>
    );
  }
}
