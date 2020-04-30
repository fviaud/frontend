import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, Typography } from "@material-ui/core";

const LauchScreen = (props) => {
  return (
    <Box
      style={{ transform: "translate(-50%, -50%)" }}
      position="absolute"
      top="50%"
      left="50%"
      textAlign="center"
    >
      <CircularProgress />
      <Typography>Chargement en cours ...</Typography>
    </Box>
  );
};

export default LauchScreen;
