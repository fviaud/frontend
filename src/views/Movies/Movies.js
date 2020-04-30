import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import apiMovie, { apiMovieMap } from "api/api.movie";
import Movie from "./Movie";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default (props) => {
  const { openDialog } = props;
  const [movies, setMovies] = useState();
  const classes = useStyles();
  useEffect(() => {
    apiMovie
      .get("/discover/movie")
      .then((response) => response.data.results)
      .then((moviesApi) => {
        setMovies(moviesApi.map(apiMovieMap));
        console.log(moviesApi.map(apiMovieMap));
      })
      .catch((err) => console.log(err));
  }, []);

  return movies ? (
    <Grid container>
      {movies.map((movie) => (
        <Movie movie={movie} onSignInClick={() => openDialog()} />
      ))}
    </Grid>
  ) : (
    "chargement en cours"
  );
};
