import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { apiUrls, routerUrls } from "../../settings/urls";
import { axiosInstance } from "../../settings/axios";
import { color } from "../../settings/color";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();

  // Handle submit
  function handleSubmit(e) {
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
      <Box
        sx={{
          position: "fixed",
          height: "100%",
          width: "100%",
          backgroundColor: color.background.alt1,
        }}
      >
        <Card
          sx={{
            backgroundColor: color.background.secondary,
            width: "30rem",
            padding: "1.8rem",
            borderRadius: "0.4rem",
            mx: "auto",
            marginTop: "6rem",
          }}
        >
          <CardContent>
            <Typography variant="h5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
              consequuntur.
            </Typography>
            <Box
              sx={{
                color: color.error.primary,
                margin: "1.5rem 0",
                fontWeight: "500",
              }}
            >
              {errorMessage.map((item, idx) => {
                return (
                  <Typography key={idx} sx={{ margin: "0.3rem" }}>
                    {item.toUpperCase()}
                  </Typography>
                );
              })}
            </Box>
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

            <Button
              variant="contained"
              onClick={(e) => {
                handleSubmit(e);
              }}
              sx={{ width: "100%" }}
            >
              sign up
            </Button>
          </CardContent>
          <CardActions>
            <Typography>
              Other sign in method will be available sometime later.
            </Typography>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

export default Register;
