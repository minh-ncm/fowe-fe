import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { axiosInstance } from "../../settings/axios";
import { apiUrls } from "../../settings/urls";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import Loading from "../fowe/Loading";

const BlogDetails = () => {
  let params = useParams();
  const [blog, setBlog] = useState();
  const [isLoading, setIsLoading] = useState(true);
  function fetchBlogData() {
    axiosInstance
      .get(`${apiUrls.blog.crud}?id=${params.blogId}`)
      .then(function (response) {
        setBlog(response.data);
      })
      .catch()
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(function () {
    fetchBlogData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box>
          <Container maxWidth="lg" disableGutters>
            <img component="img" alt="thumbnail" src={blog.thumbnail} />
            <Box sx={{ margin: "2rem 0" }}>
              <Typography variant="h3">{blog.title}</Typography>
              <Typography>
                Post on: {blog.created_date} - Last update: {blog.last_modified}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ margin: "2rem 0" }}>
              {blog &&
                blog.text.split("<BR>").map((item, idx) => {
                  if (item.startsWith("<IMG>")) {
                    return (
                      <img
                        key={idx}
                        src={item.substr("<IMG>".length)}
                        alt="image"
                        style={{
                          width: "50%",
                          height: "50%",
                          margin: "auto",
                          display: "block",
                        }}
                      />
                    );
                  } else {
                    return (
                      <Typography
                        key={idx}
                        sx={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
                      >
                        {item}
                      </Typography>
                    );
                  }
                })}
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default BlogDetails;
