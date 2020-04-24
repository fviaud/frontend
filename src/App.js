import React from "react";
import { Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createBrowserHistory } from "history";

import theme from "./theme";
import "./assets/scss/index.scss";
import { Routes } from "./Routes";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
