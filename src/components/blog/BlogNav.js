import React from "react";

import { useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";

import AddBoxIcon from "@mui/icons-material/AddBox";

import { routerUrls } from "../../settings/urls";
import { useAppContext } from "../../settings/AppContext";

const menu = [
  { action: "create", desc: "Write a new blog", icon: <AddBoxIcon /> },
];
const BlogNav = () => {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  function handleClickMenu(action) {
    if (!isLoggedIn) {
      navigate(routerUrls.fowe.error, { state: { code: 401 } });
    } else {
      switch (action) {
        case "create":
          navigate(routerUrls.blog.create);
          break;
      }
    }
  }
  return (
    <List>
      {menu.map(function (item, index) {
        return (
          <ListItem
            key={`action#${index}`}
            onClick={() => {
              handleClickMenu(item.action);
            }}
          >
            <ListItemIcon>
              <IconButton>{item.icon}</IconButton>
            </ListItemIcon>
          </ListItem>
        );
      })}
    </List>
  );
};
export default BlogNav;
