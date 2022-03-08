import * as tf from "@tensorflow/tfjs";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { apiUrls } from "../../settings/urls";
import { axiosInstance } from "../../settings/axios";

const Yolo = () => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");
  const [responseFile, setResponeFile] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(file);
    let formData = new FormData();
    formData.append("model", "yolo");
    formData.append("image", file);
    axiosInstance
      .post(apiUrls.vision.crud, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
        timeout: 1000 * 20,
      })
      .then((response) => {
        console.log(response);
        const temp = new File([response.data], "result.jpeg", {
          type: "image/jpg",
        });
        setResponeFile(URL.createObjectURL(temp));
        console.log(temp);
        // console.log(url);
      });
  };
  return (
    <>
      <div>
        <h1>Yolo</h1>
        <h3>This is a beta page i'll fix ui/ux later</h3>
        <Typography variant="h4">Object detection with Yolov5 model</Typography>
        <Typography>{fileName}</Typography>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              accept="image/*"
              multiple
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setFileName(e.target.files[0].name);
                setFile(e.target.files[0]);
              }}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
            <Button type="submit">detect</Button>
          </label>
        </form>
        <img src={responseFile} />
      </div>
    </>
  );
};

export default Yolo;
