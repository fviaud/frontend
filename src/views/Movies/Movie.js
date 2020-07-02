import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Grid,
  IconButton,
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    margin: 6,
  },
  img: {
    width: "100%",
  },
  active: {
    color: theme.palette.success.main,
  },
}));

export default (props) => {
  const { curentUser, onSignInClick, isFavori, handelFavoris } = props;
  const classes = useStyles();
  const { movie } = props;

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        title={movie ? movie.title : <Skeleton />}
        subheader={movie ? movie.details : <Skeleton width="60%" />}
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs>
            {movie ? (
              <img className={classes.img} src={movie.img} alt={movie.title} />
            ) : (
              <Skeleton variant="rect" className={classes.img} height={300} />
            )}
          </Grid>
          <Grid item xs>
            {movie ? (
              <Typography>{movie.description}</Typography>
            ) : (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {movie ? (
          <>
            <IconButton
              className={isFavori ? classes.active : "nothing"}
              onClick={
                !curentUser
                  ? onSignInClick
                  : () => handelFavoris(isFavori, movie)
              }
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </>
        ) : (
          <Skeleton width="100%" />
        )}
      </CardActions>
    </Card>
  );
};
