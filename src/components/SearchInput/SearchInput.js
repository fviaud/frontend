import React, { useState, useRef, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "4px",
    alignItems: "center",
    padding: theme.spacing(1),
    display: "flex",
    flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "-0.05px",
  },
}));

export default ({ setQuery }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = (data) => {
    setQuery(data.query);
  };

  return (
    <Paper
      component="form"
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SearchIcon />

      <InputBase
        className={classes.input}
        name="query"
        placeholder="recherche"
        inputRef={register}
      />
    </Paper>
  );
};
