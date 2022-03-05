import React, { useReducer, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { apiUrls, routerUrls } from "../../settings/urls";
import { color } from "../../settings/color";
import { axiosInstance } from "../../settings/axios";

const defaultBlogState = {
  title: "",
  thumbnail: "",
  text: "",
  contentList: [],
};
// Handle blog's state
function handleBlogState(state, action) {
  let newContentList = [];
  switch (action.type) {
    case "CHANGE_TEXT":
      return { ...state, text: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "INSERT_TEXT":
      newContentList = [
        ...state.contentList,
        { type: "text", value: state.text },
      ];
      return { ...state, text: "", contentList: newContentList };
    case "INSERT_THUMBNAIL":
      return { ...state, fileList: [], thumbnail: action.payload };
    case "INSERT_IMAGES":
      newContentList = [
        ...state.contentList,
        { type: "images", value: action.payload },
      ];
      return { ...state, fileList: [], contentList: newContentList };
    default:
      throw new Error();
  }
}
const BlogCreate = () => {
  const blogPreviewRef = useRef();
  const [blogState, dispatch] = useReducer(handleBlogState, defaultBlogState);
  useEffect(
    function () {
      let text = "";
      blogState.contentList.forEach((item) => {
        if (item.type === "text") {
          text += "&emsp;" + item.value + "<br/>";
        }
      });
      blogPreviewRef.current.innerHTML = text;
    },
    [blogState.contentList]
  );
  const navigate = useNavigate();
  // Handle sumbit when create new blog
  function handleSubmit(e) {
    // Encode blog content
    const imageToken = "<IMG>";
    const breakToken = "<BR>";
    let encodedText = "";
    let imageList = [];
    blogState.contentList.forEach((item) => {
      switch (item.type) {
        case "text":
          encodedText += item.value + breakToken;
          break;
        case "images":
          Array.from(item.value).forEach((image) => {
            encodedText += imageToken + breakToken;
            imageList.push(image);
          });
          break;
        default:
          throw new Error();
      }
    });
    // Send input data to server
    let formData = new FormData();
    formData.append("title", blogState.title);
    formData.append("thumbnail", blogState.thumbnail);
    formData.append("text", encodedText);
    imageList.forEach((image, index) => {
      formData.append("img" + index, image);
    });
    axiosInstance
      .post(apiUrls.blog.crud, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then()
      .catch(function (error) {
        if (error.response) {
          navigate(routerUrls.fowe.error, {
            state: { code: error.response.status },
          });
        }
      })
      .finally();
  }

  return (
    <>
      <ThemeProvider
        theme={(theme) =>
          createTheme({
            ...theme,
            palette: {
              ...theme.palette,
              background: {
                ...theme.palette.background,
                default: color.background.secondary,
              },
            },
          })
        }
      >
        <CssBaseline />
        <Container>
          <form>
            <Card
              sx={{
                width: "100%",
                padding: "1.5rem",
                marginTop: "3rem",
              }}
            >
              <CardContent>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Title"
                  value={blogState.title}
                  onChange={(e) =>
                    dispatch({ type: "SET_TITLE", payload: e.target.value })
                  }
                  inputProps={{ style: { fontSize: "2rem" } }}
                  InputLabelProps={{ style: { fontSize: "2rem" } }}
                  sx={{ padding: "1rem" }}
                />
                <Box sx={{ padding: "1rem" }}>
                  <Typography
                    variant="p"
                    ref={blogPreviewRef}
                    sx={{ fontSize: "1rem" }}
                  ></Typography>
                </Box>

                <Grid container>
                  <Grid item xs={2}>
                    <ButtonGroup orientation="vertical">
                      <label style={{ width: "100%" }}>
                        <input
                          type="file"
                          accept="*/image"
                          style={{ display: "none" }}
                          onClick={(e) => {
                            dispatch({
                              type: "INSERT_THUMBNAIL",
                              payload: e.target.files[0],
                            });
                          }}
                        />
                        <Button component="span" variant="standard">
                          thumbnail
                        </Button>
                      </label>
                      <label>
                        <input
                          multiple
                          type="file"
                          accept="*/image"
                          style={{ display: "none" }}
                          onClick={(e) => {
                            dispatch({
                              type: "INSERT_IMAGES",
                              payload: e.target.files,
                            });
                          }}
                        />
                        <Button component="span" variant="standard">
                          images
                        </Button>
                      </label>
                    </ButtonGroup>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      multiline
                      variant="standard"
                      placeholder="Write paragraph's text here"
                      value={blogState.text}
                      inputProps={{
                        style: { height: "12rem", fontSize: "1.25rem" },
                      }}
                      sx={{ width: "100%" }}
                      onChange={(e) =>
                        dispatch({
                          type: "CHANGE_TEXT",
                          payload: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (blogState.text.trim() !== "") {
                            dispatch({ type: "INSERT_TEXT" });
                          } else {
                            e.preventDefault();
                          }
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        if (blogState.text !== "") {
                          dispatch({ type: "INSERT_TEXT" });
                        }
                      }}
                    >
                      Insert
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button variant="contained" onClick={(e) => handleSubmit(e)}>
                  create blog
                </Button>
              </CardActions>
            </Card>
          </form>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default BlogCreate;
