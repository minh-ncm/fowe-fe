import React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Router from "./settings/Router";
import { defaultTheme } from "./settings/color";

function App() {
  return (
    <>
      <ThemeProvider theme={createTheme(defaultTheme)}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
