import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { RouteWithLayout } from "./components";

import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";
import {
  Dashboard as DashboardView,
  Projets as ProjetsView,
  SignIn as SignInView,
} from "./views";

export const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={ProjetsView}
        exact
        layout={MinimalLayout}
        path="/Projets"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/SignIn"
      />
      <Redirect to="/dashboard" />
    </Switch>
  );
};
