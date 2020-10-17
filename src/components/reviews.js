import React, { Component } from "react";
import moviesAPI from "../services/moviesAPI";
import Error from "../components/error";
import Spinner from "../components/loader";
export default class Reviews extends Component {
  state = {
    reviews: [],
    loading: false,
    error: null,
  };
  componentDidMount() {
    const movieId = this.props.match.params.movieId;
    this.setState({
      loading: true,
    });
    moviesAPI
      .fetchMovieReviews(movieId)
      .then((reviews) =>
        this.setState((prevState) => ({
          reviews: [...prevState.reviews, ...reviews],
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }
  render() {
    const { reviews, error, loading } = this.state;
    const reviewsRender = reviews.length > 0;
    return (
      <>
        {error && <Error message={`OOPS: ${error.message}`} />}
        {loading && <Spinner />}
        {reviewsRender ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No found any review</p>
        )}
      </>
    );
  }
}
