import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Loading from "../fowe/Loading";
import News from "./News";
import { apiUrls } from "../../settings/urls";
import { axiosInstance } from "../../settings/axios";

const NewsIndex = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [source, setSource] = useState("nyt");

  function fetchData(url) {
    setLoading(true);
    axiosInstance
      .get(url)
      .then(function (response) {
        setData(response.data);
      })
      .catch()
      .finally(function () {
        setLoading(false);
      });
  }

  useEffect(() => {
    const url = apiUrls.news + `${source && "?source=" + source}`;
    fetchData(url);
  }, [source]);

  return (
    <Box sx={{ padding: "1rem 2rem" }}>
      <header>
        <Typography variant="h2" align="center" sx={{ margin: "1rem 0rem" }}>
          A quick look to what happening around the world
        </Typography>
      </header>
      <main>
        {loading ? (
          <Loading />
        ) : (
          <section>
            <Grid container spacing={2}>
              {data.map((news) => {
                return (
                  <Grid key={news.id} item xs={12} sm={6} md={4} lg={3}>
                    <News key={news.id} news={news} />
                  </Grid>
                );
              })}
            </Grid>
          </section>
        )}
      </main>
    </Box>
  );
};

export default NewsIndex;
