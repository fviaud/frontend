import React, { useContext, useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button, TextField, Link, Typography } from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";

// import apiAuth from "conf/api.auth";
import { MyContext } from "App";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/film.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px",
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },

  sugestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
  erreur: {
    marginTop: theme.spacing(2),
  },
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
  const [, setCurentUser] = useContext(MyContext);
  const classes = useStyles();

  const schema = {
    username: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 64,
      },
    },
    password: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 128,
      },
    },
  };

  const [formState, setFormState] = useState({
    isValid: false,
    loading: false,
    values: {},
    touched: {},
    errors: {},
    api: null,
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const erreur = (error) => {
    let erreurMessage;
    if (error.response) {
      erreurMessage = error.response.data.message;
    } else {
      erreurMessage = error.message;
    }
    setFormState((formState) => ({
      ...formState,
      api: erreurMessage,
      isValid: true,
      loading: false,
    }));
  };

  const handleSignIn = (event) => {
    setFormState((formState) => ({
      ...formState,
      isValid: false,
      loading: true,
    }));

    event.preventDefault();
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                Choose your movie.
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignIn}>
                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  <img
                    alt="Logo"
                    src="/images/logo_getIT_small_transparent.png"
                    height="50"
                  />
                </Typography>
                <Typography className={classes.title} variant="h2">
                  Login
                </Typography>

                <TextField
                  className={classes.textField}
                  error={hasError("username")}
                  fullWidth
                  helperText={
                    hasError("username") ? formState.errors.username[0] : null
                  }
                  label="email"
                  name="username"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.username || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("password")}
                  fullWidth
                  helperText={
                    hasError("password") ? formState.errors.password[0] : null
                  }
                  label={"Password"}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ""}
                  variant="outlined"
                />
                <div className={classes.wrapper}>
                  <Button
                    id="btn-signin"
                    className={classes.signInButton}
                    color="primary"
                    disabled={!formState.isValid}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Login
                  </Button>
                  {formState.loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>

                {/* {formState.api && (
                  <Typography color="textSecondary" variant="body1">
                    <Alert
                      onClose={() => {
                        setFormState((formState) => ({
                          ...formState,
                          api: "",
                        }));
                      }}
                      variant="filled"
                      severity="error"
                      className={classes.erreur}
                    >
                      {formState.api}
                    </Alert>
                  </Typography>
                )} */}
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
