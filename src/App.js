import React, { Component, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/header";
import Spinner from "./components/loader";
import routes from "./routes";
class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route
              path={routes.home}
              exact
              component={lazy(() =>
                import("./views/home" /*webpackChunkName:'home-view'*/)
              )}
            />
            <Route
              path={routes.movieDetails}
              component={lazy(() =>
                import(
                  "./views/movie-details" /*webpackChunkName:'movie-details-view'*/
                )
              )}
            />
            <Route
              path={routes.movies}
              component={lazy(() =>
                import(
                  "./views/moviesPage" /*webpackChunkName:'movie-search-view'*/
                )
              )}
            />
            <Redirect to={routes.home} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default App;
