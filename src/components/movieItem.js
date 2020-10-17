import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import PropTypes from "prop-types";

const MovieGalleryItem = ({ location, id, original_title }) => (
  <li>
    <Link
      to={{
        pathname: `${routes.movies}/${id}`,
        state: { from: location },
      }}
    >
      {original_title}
    </Link>
  </li>
);

export default MovieGalleryItem;
