import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { routerUrls, apiUrls } from "../../settings/urls";
import { axiosInstance } from "../../settings/axios";
import { useAppContext } from "../../settings/AppContext";
import { color } from "../../settings/color";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthErr, setIsAuthErr] = useState(false);
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
        if (error.response) {
          if (error.response.status === 401) {
            setIsAuthErr(true);
          }
        }
      });
  }
  function submitHandler(e) {
    e.preventDefault();
    sendLoginRequest();
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
            padding: "1.8rem",
            width: "30rem",
            borderRadius: "0.4rem",
            marginTop: "6rem",
            mx: "auto",
          }}
        >
          <CardContent>
            <form onSubmit={(e) => submitHandler(e)}>
              <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Distinctio, voluptatibus!
              </Typography>
              <Typography
                variant="error"
                sx={{
                  display: `${isAuthErr ? "block" : "none"}`,
                  marginBottom: "1rem",
                  color: color.error.primary,
                }}
              >
                Wrong username or password
              </Typography>
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
              <Button type="submit" variant="contained" sx={{ width: "100%" }}>
                login
              </Button>
            </form>
          </CardContent>
          <CardActions>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              tempora numquam esse eveniet. Sapiente aut, tenetur assumenda
              veniam eos eius?
            </Typography>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default Login;
