import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes";
const Header = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink
            exact
            to={routes.home}
            className="navigation-link"
            activeClassName="navigation-link-active"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.movies}
            className="navigation-link"
            activeClassName="navigation-link-active"
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </>
  );
};
export default Header;
