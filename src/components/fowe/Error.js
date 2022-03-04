import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const defaultErrMsg = {
  400: "There's something wrong with your request",
  401: "You are not allowed to continue. Maybe try login with an account which has permission",
  500: "Oops. There's something wrong on our side. We'll be grateful if you could report this to us",
  503: "This service is disabled",
};
const Error = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state) {
    var { code, msg } = props;
  } else {
    var { code, msg } = state;
    if (!msg) {
      msg = defaultErrMsg[code];
    }
  }

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography
            variant="h3"
            sx={{
              marginTop: "3rem",
              marginBottom: "2rem",
            }}
          >
            {code} - {msg}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ fontSize: "1.5rem" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            go back
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Error;
