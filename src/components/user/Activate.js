import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { axiosInstance } from "../../settings/axios";
import { routerUrls, apiUrls } from "../../settings/urls";
import { color } from "../../settings/color";

const Activate = () => {
  const [verifyToken, setVerifyToken] = useState("");
  const [isResend, setResend] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [username, setUsername] = useState(state ? state.username : "");

  function handleSubmit() {
    let data = {
      token: verifyToken,
    };
    if (isResend) data = { ...data, username };
    axiosInstance
      .post(apiUrls.user.verify, data)
      .then(function (response) {
        setResend(false);
        navigate(routerUrls.user.login);
      })
      .catch();
  }
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: color.background.alt1,
        }}
      >
        <Card
          sx={{
            backgroundColor: color.background.secondary,
            marginTop: "6rem",
            mx: "auto",
            padding: "1.8rem",
            width: "45rem",
          }}
        >
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
                Enter verification code sent to your email
              </Typography>

              <TextField
                type="text"
                variant="outlined"
                label="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ width: "100%" }}
              />
              <TextField
                type="text"
                variant="outlined"
                label="activate token"
                value={verifyToken}
                onChange={(e) => setVerifyToken(e.target.value)}
                sx={{ width: "100%", margin: "1rem 0" }}
              />
              <Button variant="contained" type="submit" sx={{ width: "100%" }}>
                Activate
              </Button>

              <Button
                onClick={() => {
                  setResend(true);
                  setVerifyToken("");
                }}
                sx={{ width: "100%" }}
              >
                Resend code
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Activate;
