import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import routes from "../routes";
import Reviews from "../components/reviews";
import Casts from "../components/casts";
import moviesAPI from "../services/moviesAPI";
import Error from "../components/error";
import Spinner from "../components/loader";
import GoBackButton from "../components/goBackButton";
class MovieDetails extends Component {
  state = {
    movie: null,
    loading: false,
    erroe: null,
  };
  componentDidMount() {
    const movieId = this.props.match.params.movieId;
    this.setState({
      loading: true,
    });
    moviesAPI
      .fetchMovieDetails(movieId)
      .then((movie) => this.setState({ movie }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }
  handleGoBack = () => {
    const { location, history } = this.props;
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push(routes.home);
  };
  render() {
    const { movie, error, loading } = this.state;
    const { match, location } = this.props;
    return (
      <>
        {error && <Error message={`OOPS: ${error.message}`} />}
        {loading && <Spinner />}
        {movie && (
          <>
            <GoBackButton onGoBackHandler={this.handleGoBack} />
            <h1>{movie.data.original_title}</h1>
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.data.poster_path}`}
            />
            <h2>Overview</h2>
            <p>{movie.data.overview}</p>
            <h2>Popularity</h2>
            <p>{movie.data.popularity}</p>
            <h2>Genres:</h2>
            <ul>
              {movie.data.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
            <h2>Additional information</h2>
            <ul>
              <li>
                <Link to={`${match.url}/casts`}>Casts</Link>
              </li>
              <li>
                <Link to={`${match.url}/reviews`}>Reviews</Link>
              </li>
            </ul>
            {location.pathname === `${match.url}/casts` && (
              <Route
                exact
                to={`${this.props.match.path}/${movie.data.id}/casts`}
                component={Casts}
              />
            )}
            {location.pathname === `${match.url}/reviews` && (
              <Route
                exact
                to={`${this.props.match.path}/${movie.data.id}/reviews`}
                component={Reviews}
              />
            )}
          </>
        )}
      </>
    );
  }
}
export default MovieDetails;
