import React from "react";

import Typography from "@mui/material/Typography";

const Landing = () => {
  return (
    <>
      <Typography variant="h4" sx={{ padding: "1.5rem" }}>
        Welcome.
        <br /> My web is still under development so there aren't a lot of
        features for you to playing with. <br />
        You can visit about section to see my site info and where it's heading
        to.
      </Typography>
      <Typography variant="p" sx={{ fontSize: "1.5rem", padding: "1.5rem" }}>
        Right now, it just allow me to write some blogs and fetching stock data
        for me to research time series problem in machine learning.
      </Typography>
    </>
  );
};

export default Landing;
