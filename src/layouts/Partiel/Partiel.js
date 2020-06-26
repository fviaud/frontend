import React, { useState, useContext } from "react";
import readingTime from "reading-time";
import { makeStyles } from "@material-ui/styles";
import { MyContext } from "App";

import { DialogHost } from "components";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import authentication from "services/authentication";
import { Topbar } from "./components";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: "100%",
  },
  content: {
    height: "100%",
  },
}));

export default (props) => {
  const { children } = props;
  const classes = useStyles();
  const [user, setUser, , setQuery] = useContext(MyContext);
  const [open, setOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    autoHideDuration: 0,
    message: "",
    open: false,
  });

  const openDialog = () => {
    setOpen(true);
  };

  const openSnackbar = (message, severity, autoHideDuration = 2) => {
    setSnackbar({
      autoHideDuration: readingTime(message).time * autoHideDuration,
      message,
      open: true,
      severity,
    });
  };

  const closeSnackbar = (clearMessage = false) => {
    setSnackbar({
      message: clearMessage ? "" : snackbar.message,
      open: false,
    });
  };

  const signOut = () => {
    authentication
      .signOut()
      .then(() => {
        openSnackbar("Signed out", "success");
        setUser();
      })
      .catch((reason) => {});
  };

  const Alert = (props) => (
    <MuiAlert elevation={6} variant="filled" {...props} />
  );

  return (
    <div className={classes.root}>
      <Topbar
        // onSignInClick={() => openDialog("signInDialog")}
        onSignInClick={() => openDialog()}
        user={user}
        setQuery={setQuery}
        signOut={signOut}
      />
      <main className={classes.content}>
        {/* {children} */}
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { user, openDialog }, null);
        })}
      </main>
      <DialogHost
        setOpen={setOpen}
        open={open}
        setUser={setUser}
        openSnackbar={openSnackbar}
      />
      <Snackbar
        autoHideDuration={snackbar.autoHideDuration}
        message={snackbar.message}
        open={snackbar.open}
        onClose={closeSnackbar}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};
