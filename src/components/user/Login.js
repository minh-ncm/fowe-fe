import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { routerUrls, apiUrls } from "../../settings/urls";
import { axiosInstance } from "../../settings/axios";
import { useAppContext } from "../../settings/AppContext";
import { color } from "../../settings/color";

import ErrorMessage from "./ErrorMessage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const { setIsLoggedIn } = useAppContext();
  const navigate = useNavigate();
  function sendLoginRequest() {
    axiosInstance
      .post(apiUrls.token.pair, {
        username,
        password,
      })
      .then(function (response) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        axiosInstance.defaults.headers[
          "Authorization"
        ] = `JWT ${localStorage.getItem("access_token")}`;
        setIsLoggedIn(true);
        navigate(routerUrls.fowe.index);
      })
      .catch(function (error) {
        const response = error.response;
        if (response) {
          switch (response.status) {
            case 401:
              setErrorMessage([response.data.detail]);
              break;
            case 400:
              break;
          }
        }
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    let msg = [];
    if (username.trim() === "") msg.push("Please enter username");
    if (password.trim() === "") msg.push("Please enter password");
    setErrorMessage(msg);
    if (msg.length === 0) sendLoginRequest();
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
                default: color.background.secondary,
              },
            },
          })
        }
      >
        <CssBaseline />
        <form onSubmit={handleSubmit}>
          <Card
            elevation={2}
            sx={{
              padding: "1.8rem",
              width: "30rem",
              borderRadius: "0",
              marginTop: "6rem",
              mx: "auto",
            }}
          >
            <CardContent>
              <Typography align="center" variant="h3">
                Login
              </Typography>
              <ErrorMessage messages={errorMessage} />
              <TextField
                type="text"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                sx={{ width: "100%", marginBottom: "1rem" }}
              />
              <TextField
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                sx={{ width: "100%", marginBottom: "1rem" }}
              />
              <Button variant="contained" type="submit" sx={{ width: "100%" }}>
                login
              </Button>
            </CardContent>
            <CardActions>
              <Typography>
                Other sign in method will be available later
              </Typography>
            </CardActions>
          </Card>
        </form>
      </ThemeProvider>
    </>
  );
};

export default Login;
