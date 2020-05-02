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
  const { user, onSignInClick, isFavori, handelFavoris } = props;
  const classes = useStyles();
  const { movie } = props;

  return (
    <Grid item xs>
      <Card className={classes.root} variant="outlined">
        <CardHeader title={movie.title} subheader={movie.details} />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs>
              <img className={classes.img} src={movie.img} alt={movie.title} />
            </Grid>
            <Grid item xs>
              <Typography>{movie.description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <IconButton
            aria-label="add to favorites"
            className={isFavori ? classes.active : "nothing"}
            // onClick={!user ? onSignInClick : () => handelFavoris()}
            onClick={() => handelFavoris(isFavori, movie)}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
