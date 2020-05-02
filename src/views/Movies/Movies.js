import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import apiMovie, { apiMovieMap } from "api/api.movie";
import apiFirebase from "api/api.firebase";
import Movie from "./Movie";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default (props) => {
  const { user, openDialog } = props;

  const [movies, setMovies] = useState({ loading: true });
  const [favoris, setFavoris] = useState({ values: [], loading: false });
  const classes = useStyles();
  useEffect(() => {
    apiMovie
      .get("/discover/movie")
      .then((response) => response.data.results)
      .then((moviesApi) => {
        setMovies({ values: moviesApi.map(apiMovieMap), loading: false });
      })
      .catch((err) => console.log(err));
    apiFirebase.get("films.json").then((response) => {
      setFavoris({
        values: response.data ? response.data : [],
        loading: false,
      });
    });
  }, []);

  const handelFavoris = (isFavori, movie) => {
    if (isFavori) {
      setFavoris({
        ...favoris,
        values: [...favoris.values.filter((f) => f.title !== movie.title)],
      });
    } else {
      setFavoris({ ...favoris, values: [...favoris.values, movie] });
    }
  };

  useEffect(() => {
    apiFirebase.put("films.json", favoris.values);
  }, [favoris.values]);

  return movies.loading || favoris.loading ? (
    "chargement en cours"
  ) : (
    <Grid container>
      {movies.values.map((movie) => (
        <Movie
          movie={movie}
          user={user}
          onSignInClick={() => openDialog()}
          isFavori={favoris.values.map((f) => f.title).includes(movie.title)}
          handelFavoris={handelFavoris}
        />
      ))}
    </Grid>
  );
};
