import axios from "axios";

import { apiUrls } from "./urls";

const axiosInstance = axios.create({
  baseUrl: apiUrls.token,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? `JWT ${localStorage.getItem("access_token")}`
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export { axiosInstance };
