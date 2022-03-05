import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { apiUrls, routerUrls } from "../../settings/urls";
import { axiosInstance } from "../../settings/axios";
import { color } from "../../settings/color";

import ErrorMessage from "./ErrorMessage";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();

  // Handle submit
  function handleSubmit(e) {
    e.preventDefault();
    var msg = [];
    if (username.trim() === "") {
      msg.push("Can't leave username empty");
    }
    if (email === "") {
      msg.push("Can't leave email empty");
    }
    if (password === "") {
      msg.push("Can't leave password empty");
    }
    if (password !== passwordConfirm) {
      msg.push("Password don't match");
    }
    setErrorMessage(msg);
    // Send user input to backend
    if (msg.length === 0) {
      axiosInstance
        .post(apiUrls.user.crud, {
          username: username,
          email: email,
          password: password,
        })
        .then(function (response) {
          if (response.status === 201) {
            navigate(routerUrls.user.verify, {
              state: { usernanme: username },
            });
          }
        })
        .catch((error) => {
          const response = error.response;
          if (response) {
            const data = response.data;
            var msg = [];
            if (data.username) {
              msg.push(data.username[0]);
            }
            if (data.email) {
              msg.push(data.email[0]);
            }
            if (data.password) {
              msg.push(data.password[0]);
            }
            setErrorMessage(msg);
          }
        });
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
              width: "30rem",
              padding: "1.8rem",
              borderRadius: "0",
              mx: "auto",
              marginTop: "6rem",
            }}
          >
            <CardContent>
              <Typography align="center" variant="h3">
                Register
              </Typography>
              <ErrorMessage messages={errorMessage} />
              <TextField
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ width: "100%", marginBottom: "1rem" }}
              />
              <TextField
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: "100%", marginBottom: "1rem" }}
              />
              <TextField
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ width: "100%", marginBottom: "1rem" }}
              />
              <TextField
                type="password"
                placeholder="confirm password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                sx={{ width: "100%", marginBottom: "1rem" }}
              />

              <Button type="submit" variant="contained" sx={{ width: "100%" }}>
                register
              </Button>
            </CardContent>
            <CardActions>
              <Typography>
                Other sign in method will be available sometime later.
              </Typography>
            </CardActions>
          </Card>
        </form>
      </ThemeProvider>
    </>
  );
}

export default Register;
