import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

const Loading = () => {
  return (
    <>
      <Grid container sx={{ justifyContent: "center" }}>
        <CircularProgress size="8rem" sx={{ marginTop: "3rem" }} />
      </Grid>
    </>
  );
};

export default Loading;
