import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";

import { getMovies } from "api/api.movie";
import apiFirebase from "api/api.firebase";
import Movie from "./Movie";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  img: {
    width: "100%",
  },
}));

export default (props) => {
  const { user, openDialog } = props;

  const [movies, setMovies] = useState({ loading: true });
  const [favoris, setFavoris] = useState({ values: [], loading: false });
  const classes = useStyles();

  useEffect(() => {
    getMovies(setMovies, 4);
  }, []);

  const handelFavoris = (isFavori, movie) => {
    if (isFavori) {
      setFavoris({
        ...favoris,
        values: [...favoris.values.filter((f) => f.title !== movie.title)],
      });
    } else {
      const db = firebase.firestore();
      db.collection("favoris").add(movie);
      setFavoris({ ...favoris, values: [...favoris.values, movie] });
    }
  };

  useEffect(() => {
    apiFirebase.put("films.json", favoris.values);
  }, [favoris.values]);

  function Media(props) {
    const { loading = false } = props;

    return (
      <Grid container>
        {(loading ? Array.from(new Array(20)) : movies.values).map(
          (movie, index) => (
            <Movie
              movie={movie}
              user={user}
              onSignInClick={() => openDialog()}
              isFavori={
                movie
                  ? favoris.values.map((f) => f.title).includes(movie.title)
                  : false
              }
              handelFavoris={handelFavoris}
            />
          )
        )}
      </Grid>
    );
  }

  return (
    <Box overflow="hidden">
      <Media loading={movies.loading} />
    </Box>
  );
};
