import React, { useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
      <Typography variant="h2">Logged out</Typography>
      <Button
        variant="contained"
        to={routerUrls.user.login}
        component={RouterLink}
      >
        Login again?
      </Button>
    </>
  );
};
export default Logout;
