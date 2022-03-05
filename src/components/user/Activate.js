import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import { axiosInstance } from "../../settings/axios";
import { routerUrls, apiUrls } from "../../settings/urls";
import { color } from "../../settings/color";

import ErrorMessage from "./ErrorMessage";

const Activate = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (token.trim() !== "") {
      axiosInstance
        .get(apiUrls.user.activate + "?token=" + token)
        .then(function (response) {
          switch (response.status) {
            case 200:
              navigate(routerUrls.user.login);
              break;
          }
        })
        .catch();
    } else {
      setErrorMessage(["Please don't leave empty token"]);
    }
  }
  function handleResend(e) {
    e.preventDefault();
    if (username.trim() !== "") {
      axiosInstance
        .get(apiUrls.user.activate + "?username=" + username)
        .then()
        .catch();
    } else {
      setErrorMessage(["Please don't leave empty username"]);
    }
  }
  return (
    <>
      <ThemeProvider
        theme={(theme) =>
          createTheme({
            ...theme,
            palette: {
              ...theme.palette,
              background: {
                ...theme.palette.background,
                default: color.background.secondary,
              },
            },
          })
        }
      >
        <CssBaseline />
        <form onSubmit={handleSubmit}>
          <Card
            sx={{
              borderRadius: "0",
              marginTop: "6rem",
              mx: "auto",
              padding: "1.8rem",
              width: "40rem",
            }}
          >
            <CardContent>
              <Typography
                align="center"
                variant="h5"
                sx={{ marginBottom: "1rem" }}
              >
                Enter activation code sent to your email
              </Typography>
              <ErrorMessage messages={errorMessage} />

              <TextField
                type="text"
                variant="outlined"
                label="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                sx={{ width: "100%" }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", margin: "1rem 0" }}
              >
                Activate
              </Button>
              <Accordion>
                <AccordionSummary>
                  <Typography
                    align="center"
                    variant="button"
                    sx={{ width: "100%" }}
                  >
                    resend code
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    type="text"
                    variant="outlined"
                    label="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      setToken("");
                      handleResend(e);
                    }}
                    sx={{ width: "100%" }}
                  >
                    resend
                  </Button>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </form>
      </ThemeProvider>
    </>
  );
};

export default Activate;
