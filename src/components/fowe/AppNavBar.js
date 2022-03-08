import React from "react";

import { Link as RouterLink } from "react-router-dom";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { color } from "../../settings/color";
import { useAppContext } from "../../settings/AppContext";
import { routerUrls } from "../../settings/urls";

const AppNavBar = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: color.background.primary }}
      >
        <Toolbar>
          <section style={{ flexGrow: "1" }}>
            <Button
              component={RouterLink}
              to={routerUrls.fowe.index}
              sx={{ fontSize: "2rem" }}
            >
              Home
            </Button>
            <Button component={RouterLink} to={routerUrls.news}>
              news
            </Button>
            <Button component={RouterLink} to={routerUrls.blog.index}>
              blogs
            </Button>
            <Button component={RouterLink} to={routerUrls.vision.index}>
              computer vision
            </Button>
            <Button component={RouterLink} to={routerUrls.fowe.about}>
              about
            </Button>
          </section>
          <section>
            {isLoggedIn ? (
              <>
                <IconButton component={RouterLink} to="#">
                  <AccountBoxIcon />
                </IconButton>
                <Button component={RouterLink} to={routerUrls.user.logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} to={routerUrls.user.login}>
                  Login
                </Button>
                <Button component={RouterLink} to={routerUrls.user.register}>
                  register
                </Button>
              </>
            )}
          </section>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppNavBar;
