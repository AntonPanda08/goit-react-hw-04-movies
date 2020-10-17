import React from "react";
import PropTypes from "prop-types";
const LoadMoreButton = ({ handleClick }) => (
  <button className="Button" type="button" onClick={handleClick}>
    Load more
  </button>
);

LoadMoreButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
export default LoadMoreButton;
