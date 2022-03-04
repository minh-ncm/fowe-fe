import React from "react";

import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

import { routerUrls } from "../../settings/urls";

const BlogPreview = (props) => {
  const { id, title, thumbnail, last_modified } = props.blog;
  const navigate = useNavigate();
  return (
    <Card>
      <CardActionArea
        onClick={(e) => navigate(`${routerUrls.blog.index}/${id}`)}
      >
        {thumbnail && (
          <CardMedia
            component="img"
            image={thumbnail}
            alt="thumbnail"
            sx={{ height: "10rem" }}
          />
        )}
        <CardContent>
          <Typography>{title}</Typography>
          <Typography>{last_modified}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default BlogPreview;
