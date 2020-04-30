import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

import validate from "validate.js";

import constraints from "constraints";
import authentication from "services/authentication";

export default (props) => {
  const initialState = {
    email: "",
    password: "",
    performingAction: false,
    errors: null,
  };

  const [user, setUser] = useState(initialState);
  const theme = {};

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSigin = (event) => {
    const { email, password } = user;
    const errors = validate(
      {
        email,
        password,
      },
      {
        email: constraints.emailAddress,
        password: constraints.password,
      }
    );

    if (errors) {
      setUser({ ...user, errors: errors });
    } else {
      authentication
        .signIn(email, password)
        .then((user) => {
          props.setUser(user);
          props.setOpen(false);

          props.openSnackbar(
            `Signed in as ${user.displayName || user.email}`,
            "success"
          );
        })
        .catch((reason) => {
          props.openSnackbar(`Signed in as ${reason.message}`, "error");
        });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.type]: value });
  };

  const handleExited = () => {
    setUser(initialState);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onExited={handleExited}
      >
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
                autoComplete="email"
                disabled={user.performingAction}
                error={!!(user.errors && user.errors.email)}
                fullWidth
                helperText={
                  user.errors && user.errors.email ? user.errors.email[0] : ""
                }
                label="E-mail address"
                placeholder="john@doe.com"
                required
                size={theme.dense ? "small" : "medium"}
                type="email"
                value={user.email}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs>
              <TextField
                autoComplete="current-password"
                disabled={user.performingAction}
                error={!!(user.errors && user.errors.password)}
                fullWidth
                helperText={
                  user.errors && user.errors.password
                    ? user.errors.password[0]
                    : ""
                }
                label="Password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                required
                size={theme.dense ? "small" : "medium"}
                type="password"
                value={user.password}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSigin} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
