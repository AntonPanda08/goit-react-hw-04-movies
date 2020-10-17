import React, { Component } from "react";
import PropTypes from "prop-types";
class MovieGallerry extends Component {
  render() {
    return <ul className="">{this.props.children}</ul>;
  }
}

export default MovieGallerry;
