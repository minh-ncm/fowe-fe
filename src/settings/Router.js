import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { routerUrls } from "./urls";

import AppNavBar from "../components/fowe/AppNavBar";
import Landing from "../components/fowe/Landing";
import Error from "../components/fowe/Error";
import About from "../components/fowe/About";
import NewsIndex from "../components/news/NewsIndex";
import Vision from "../components/vision/Vision";
import BlogIndex from "../components/blog/BlogIndex";
import BlogDetails from "../components/blog/BlogDetails";
import BlogCreate from "../components/blog/BlogCreate";
import Register from "../components/user/Register";
import Activate from "../components/user/Activate";
import Login from "../components/user/Login";
import Logout from "../components/user/Logout";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <AppNavBar />
        <Routes>
          <Route index element={<Landing />} />
          <Route path={routerUrls.fowe.about} element={<About />} />
          <Route path={routerUrls.fowe.error} element={<Error />} />
          <Route path={routerUrls.news} element={<NewsIndex />} />
          <Route path={routerUrls.vision.index} element={<Vision />} />
          <Route path={routerUrls.blog.index} element={<BlogIndex />} />
          <Route
            path={`${routerUrls.blog.index}/:blogId`}
            element={<BlogDetails />}
          />
          <Route path={routerUrls.blog.create} element={<BlogCreate />} />
          <Route path={routerUrls.user.register} element={<Register />} />
          <Route path={routerUrls.user.activate} element={<Activate />} />
          <Route path={routerUrls.user.login} element={<Login />} />
          <Route path={routerUrls.user.logout} element={<Logout />} />
          <Route path="*" element={<Error code="404" msg="url not exist" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
