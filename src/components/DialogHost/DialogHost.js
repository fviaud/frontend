import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

import validate from "validate.js";

import constraints from "constraints";
import authentication from "services/authentication";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(0),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default (props) => {
  const { setCurentUser, setOpen, openSnackbar } = props;
  const classes = useStyles();
  const initialState = {
    isValid: false,
    loading: false,
    values: {},
    touched: {},
    errors: {},
  };

  const [user, setUser] = useState(initialState);
  const theme = {};

  const handleClose = () => {
    props.setOpen(false);
  };

  // const handleSigin = (event) => {
  //   const { email, password } = user.values;

  //   setUser((user) => ({
  //     ...user,
  //     loading: true,
  //   }));

  //   authentication.signIn(
  //     email,
  //     password,
  //     props.setUser,
  //     props.setOpen,
  //     props.openSnackbar
  //   );
  // };

  const handleSignIn = (event) => {
    setUser((user) => ({
      ...user,
      loading: true,
    }));

    // event.preventDefault();
    authentication.signIn(user, setUser, setCurentUser, setOpen, openSnackbar);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    event.persist();
    setUser((user) => ({
      ...user,
      values: { ...user.values, [event.target.type]: value },
      touched: {
        ...user.touched,
        [event.target.name]: true,
      },
    }));
  };

  // useEffect(() => {
  //   const { email, password } = user.values;
  //   const errors = validate(
  //     {
  //       email,
  //       password,
  //     },
  //     {
  //       email: constraints.emailAddress,
  //       password: constraints.password,
  //     }
  //   );
  //   setUser((user) => ({
  //     ...user,
  //     isValid: errors ? false : true,
  //     errors: errors || {},
  //   }));
  //   // eslint-disable-next-line
  // }, [user.values]);

  const handleExited = () => {
    setUser(initialState);
  };

  const hasError = (field) =>
    user.touched[field] && user.errors[field] ? true : false;

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onExited={handleExited}
      >
        {/* <form className={classes.form} onSubmit={handleSignIn}> */}
        <DialogTitle id="form-dialog-title">
          Sign in to your account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                name="email"
                error={hasError("email")}
                fullWidth
                // helperText={
                //   user.errors && user.errors.email ? user.errors.email[0] : ""
                // }
                helperText={hasError("email") ? user.errors.email[0] : null}
                label="E-mail address"
                placeholder="john@doe.com"
                required
                size={theme.dense ? "small" : "medium"}
                type="email"
                value={user.values.email || ""}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs>
              <TextField
                name="password"
                error={hasError("password")}
                fullWidth
                helperText={
                  hasError("password") ? user.errors.password[0] : null
                }
                label="Password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                required
                size={theme.dense ? "small" : "medium"}
                type="password"
                value={user.values.password || ""}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs>
              {user.errors.api ? (
                <Alert variant="filled" severity="error">
                  {user.errors.api}
                </Alert>
              ) : null}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSigin} color="primary">
            Subscribe
          </Button> */}

          <Button
            className={classes.signInButton}
            onClick={handleSignIn}
            size="large"
            type="submit"
            // disabled={!user.isValid}
            variant="contained"
          >
            {user.loading ? <CircularProgress size={24} /> : "Signin"}
          </Button>
        </DialogActions>
        {/* </form> */}
      </Dialog>
    </div>
  );
};
