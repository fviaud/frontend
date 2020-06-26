import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { MyContext } from "App";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import Movie from "./Movie";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { getMovies, getSearchMovies } from "api/api.movie";
import apiFirebase from "api/api.firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const useMovieSearch = (query, pageNumber, setPageNumber) => {
  const [movies, setMovies] = useState({
    values: [],
  });

  useEffect(() => {
    setMovies({ values: [], loading: true, error: false, hasMore: false });
    setPageNumber(1);
  }, [query]);

  useEffect(() => {
    if (!query) {
      getMovies(setMovies, pageNumber);
    } else {
      getSearchMovies(setMovies, pageNumber, query);
    }
  }, [query, pageNumber]);

  return { movies };
};

export default (props) => {
  const classes = useStyles();
  const { user, openDialog } = props;
  const [, , query] = useContext(MyContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [favoris, setFavoris] = useState({ values: [], loading: false });
  const { movies } = useMovieSearch(query, pageNumber, setPageNumber);

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (movies.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && movies.hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [movies.loading, movies.hasMore]
  );

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
    // apiFirebase.put("films.json", favoris.values);
    // const db = firebase.firestore();
    // const favoris = db.collection("favoris").get();
    // console.log(favoris);
    //todo
  }, [favoris.values]);

  return (
    <>
      {!movies.error ? (
        <Grid container>
          {(movies.loading
            ? movies.values.concat(Array.from(new Array(20)))
            : movies.values
          ).map((movie, index) => {
            if (movies.values.length === index + 1) {
              return (
                <Grid item xs ref={lastMovieElementRef}>
                  <Movie
                    ref={lastMovieElementRef}
                    movie={movie}
                    user={user}
                    onSignInClick={() => openDialog()}
                    isFavori={
                      movie
                        ? favoris.values
                            .map((f) => f.title)
                            .includes(movie.title)
                        : false
                    }
                    handelFavoris={handelFavoris}
                  />
                </Grid>
              );
            } else {
              return (
                <Grid item xs>
                  <Movie
                    movie={movie}
                    user={user}
                    onSignInClick={() => openDialog()}
                    isFavori={
                      movie
                        ? favoris.values
                            .map((f) => f.title)
                            .includes(movie.title)
                        : false
                    }
                    handelFavoris={handelFavoris}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      ) : (
        <Alert variant="filled" severity="error">
          {movies.error}
        </Alert>
      )}
    </>
  );
};
