import React, { Component } from "react";
import moviesAPI from "../services/moviesAPI";
import MovieGallery from "../components/movieGallery";
import MovieGalleryItem from "../components/movieItem";
import Error from "../components/error";
import Spinner from "../components/loader";
class Home extends Component {
  state = {
    movies: [],
    loading: false,
    error: null,
    searchQuery: "",
    page: 1,
  };
  componentDidMount() {
    this.setState({
      loading: true,
    });
    moviesAPI
      .fetchMoviesPopular()
      .then((movies) =>
        this.setState((prevState) => ({
          movies: [...prevState.movies, ...movies],
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { movies, error, loading } = this.state;
    return (
      <>
        {error && <Error message={`OOPS: ${error.message}`} />}
        {loading && <Spinner />}
        <MovieGallery>
          {movies.map((movie) => (
            <MovieGalleryItem
              id={movie.id}
              key={movie.id}
              original_title={movie.original_title}
            />
          ))}
        </MovieGallery>
      </>
    );
  }
}
export default Home;
