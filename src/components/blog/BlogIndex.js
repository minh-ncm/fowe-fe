import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { axiosInstance } from "../../settings/axios";
import { apiUrls } from "../../settings/urls";

import Loading from "../fowe/Loading";
import BlogNav from "./BlogNav";
import BlogPreview from "./BlogPreview";

const BlogIndex = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    fetchBlog();
    return () => {
      setData({});
    };
  }, []);
  function fetchBlog() {
    setIsLoading(true);
    axiosInstance
      .get(apiUrls.blog.crud + "?id=all")
      .then(function (respone) {
        setData(respone.data);
      })
      .catch()
      .finally(() => setIsLoading(false));
  }
  function render() {
    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <>
          <Grid container spacing="2rem">
            <Grid item xs={1} sx={{ borderRight: "0.01rem solid black" }}>
              <BlogNav />
            </Grid>

            <Grid item xs={8}>
              <Box>
                {data.length === 0 ? (
                  <Typography variant="h2">
                    No blogs has been posted yet.
                  </Typography>
                ) : (
                  data.map(function (item) {
                    return <BlogPreview key={item.id} blog={item} />;
                  })
                )}
              </Box>
            </Grid>
          </Grid>
        </>
      );
    }
  }
  return <>{render()}</>;
};
export default BlogIndex;
