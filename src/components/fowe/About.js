import React, { useState, useEffect } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Popper from "@mui/material/Popper";

const About = () => {
  const [anchorEle, setAnchorEle] = useState(null);
  const [openPopper, setOpenPopper] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(
    function () {
      let timmer = setTimeout(function () {
        if (openPopper) {
          setOpenPopper(false);
        }
      }, 2000);
      return function () {
        clearTimeout(timmer);
      };
    },
    [openPopper]
  );
  const email = "fowe201@gmail.com";
  const aboutContent = [
    // about fowe
    <Box>
      <Box>
        <Divider textAlign="left" sx={{ margin: "1.5rem" }}>
          <Typography variant="h4">What's fowe about?</Typography>
        </Divider>
        <Typography sx={{ fontSize: "1.3rem" }}>
          It's just my personal site to testing out new things and deploy it if
          possible, write some blogs then hope for someone to read and like it.
          <br />
          About what things that i test. Well, it's varies. For instance, i want
          to try out reactjs with django so i built fowe. But i hope there will
          a lot about machine learning.
        </Typography>
      </Box>
      <Box>
        <Divider textAlign="left" sx={{ margin: "1.5rem" }}>
          <Typography variant="h4">What does fowe stand for?</Typography>
        </Divider>
        <Typography sx={{ fontSize: "1.3rem" }}>
          It's short for... Well, foo web. Yeah, i know, i sucked at naming.
        </Typography>
      </Box>
    </Box>,
    // about me
    <Box>
      <Box>
        <Divider textAlign="left" sx={{ margin: "1.5rem" }}>
          <Typography variant="h4">Something about me</Typography>
        </Divider>
        <Typography sx={{ fontSize: "1.3rem" }}>
          You can call me Minh. I was born in 2000, i'll leave the math to you.
          <br />
          Well, one of the things i enjoy is learning new things. Especially in
          computer science.
          <br />I also have this enthusiasm about custom mechanical keyboard.
          It's getting more attention so maybe you know about it?
        </Typography>
      </Box>
    </Box>,
    // about contact
    <Box>
      <Box>
        <Divider textAlign="left" sx={{ margin: "1.5rem" }}>
          <Typography variant="h4">Here're my contacts</Typography>
        </Divider>
        <Typography sx={{ fontSize: "1.3rem" }}>
          You could reach out to me through this email:
          <Button
            component="span"
            onClick={(e) => {
              navigator.clipboard.writeText(email);
              setAnchorEle(e.currentTarget);
              setOpenPopper(true);
            }}
            sx={{ fontSize: "1.3rem" }}
          >
            {email}
          </Button>
          <Popper open={openPopper} anchorEl={anchorEle} placement="top">
            <Box>
              <Typography>coppied to clipboard</Typography>
            </Box>
          </Popper>
          <br />
          I'd really apprecciate if you let me know if there's something wrong
          with my site
        </Typography>
      </Box>
    </Box>,
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={2} md={1}>
          <Tabs
            orientation="vertical"
            value={tabIndex}
            onChange={(e, newValue) => {
              setTabIndex(newValue);
            }}
          >
            <Tab label="Fowe" />
            <Tab label="Me" />
            <Tab label="Contact" />
          </Tabs>
        </Grid>
        <Grid item xs={10} md={11} sx={{ padding: "2rem" }}>
          {aboutContent[tabIndex]}
        </Grid>
      </Grid>
    </>
  );
};

export default About;
