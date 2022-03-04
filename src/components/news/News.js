import React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

const News = (props) => {
  const { title, headline, url, image, published_date, source, logo } =
    props.news;
  function redirect() {
    window.location.href = url;
  }
  return (
    <Card sx={{ borderRadius: "0.4rem" }}>
      <CardActionArea onClick={redirect}>
        <CardMedia
          component="img"
          height="200"
          src={image.url}
          alt={image.caption}
        />
        <CardHeader title={title} />
        <CardContent>
          <Typography variant="body1">{headline}</Typography>
        </CardContent>
        <CardActions>
          <Typography variant="caption">
            Post on:
            {new Date(published_date).toLocaleDateString("en-Gb", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
          </Typography>

          <Typography variant="button" textAlign="center">
            <span>
              <img
                src={logo}
                alt="images"
                style={{ height: "1.2rem", marginRight: "0.7rem" }}
              />
            </span>
            {source}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default News;
