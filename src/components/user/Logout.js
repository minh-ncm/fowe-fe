import React, { useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { routerUrls, apiUrls } from "../../settings/urls";
import { axiosInstance } from "../../settings/axios";
import { useAppContext } from "../../settings/AppContext";

const Logout = () => {
  const { setIsLoggedIn } = useAppContext();
  function logUserOut() {
    axiosInstance
      .post(apiUrls.user.logout, {
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .then(function () {})
      .catch(function () {})
      .finally(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        axiosInstance.defaults.headers.Authorization = null;
        setIsLoggedIn(false);
      });
  }
  useEffect(() => {
    logUserOut();
  }, []);
  return (
    <>
      <ThemeProvider>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "6rem",
          }}
        >
          <Typography variant="h2">Logged out</Typography>
          <Button
            variant="contained"
            to={routerUrls.user.login}
            component={RouterLink}
            sx={{ margin: "2rem 0" }}
          >
            Login again?
          </Button>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default Logout;
