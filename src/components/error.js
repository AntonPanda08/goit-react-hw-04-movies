import React from "react";
import PropTypes from "prop-types";
const Error = ({ message }) => <p>{message}</p>;
Error.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Error;
