import React, { Component } from "react";
import moviesAPI from "../services/moviesAPI";
import Error from "../components/error";
import Spinner from "../components/loader";

export default class Casts extends Component {
  state = {
    casts: [],
    loading: false,
    error: null,
  };
  componentDidMount() {
    const movieId = this.props.match.params.movieId;
    this.setState({
      loading: true,
    });
    moviesAPI
      .fetchMovieCasts(movieId)
      .then((casts) =>
        this.setState((prevState) => ({
          casts: [...prevState.casts, ...casts],
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }
  render() {
    const { casts, error, loading } = this.state;
    const castsRender = casts.length > 0;
    return (
      <>
        {error && <Error message={`OOPS: ${error.message}`} />}
        {loading && <Spinner />}
        {castsRender ? (
          <ul>
            {casts.map((cast) => (
              <li key={cast.cast_id}>
                <h3>{cast.name}</h3>
                <p>{cast.character}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No found any cast</p>
        )}
      </>
    );
  }
}
