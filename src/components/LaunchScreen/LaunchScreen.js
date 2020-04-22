import React from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    </Box>
  );
};

export default LauchScreen;
