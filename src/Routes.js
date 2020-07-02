import React, { useContext } from "react";

import { Switch, Redirect } from "react-router-dom";
import { RouteWithLayout } from "./components";

import { MyContext } from "App";

import {
  Main as MainLayout,
  Minimal as MinimalLayout,
  Partiel as PartielLayout,
} from "./layouts";
import {
  Dashboard as DashboardView,
  Projets as ProjetsView,
  Movies as MoviesView,
} from "./views";

export const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={MoviesView}
        exact
        layout={PartielLayout}
        path="/movies"
      />

      <RouteWithLayout
        component={ProjetsView}
        exact
        layout={MainLayout}
        path="/projets"
      />
      <Redirect to="/movies" />
    </Switch>
  );
};
