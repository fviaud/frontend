import React, { useState, useEffect, createContext } from "react";
import { Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createBrowserHistory } from "history";

import theme from "./theme";
import "./assets/scss/index.scss";
import { Routes } from "./Routes";
import { LaunchScreen } from "components";

const browserHistory = createBrowserHistory();
export const MyContext = createContext();

function App() {
  const [curentUser, setCurentUser] = useState({ loading: true });

  useEffect(() => {
    setTimeout(() => {
      setCurentUser({
        loading: false,
      });
    }, 3000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MyContext.Provider value={[curentUser, setCurentUser]}>
        {curentUser.loading ? (
          <LaunchScreen />
        ) : (
          <Router history={browserHistory}>
            <Routes />
          </Router>
        )}
      </MyContext.Provider>
    </ThemeProvider>
  );
}

export default App;
