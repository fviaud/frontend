import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { RouteWithLayout } from "./components";

import { Main as MainLayout } from "./layouts";
import { Dashboard as DashboardView } from "./views";

export const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/"
      />
      <Redirect to="/dashboard" />
    </Switch>
  );
};
