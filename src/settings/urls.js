const routerUrls = {
  fowe: {
    index: "/",
    about: "/about",
    error: "/error",
  },
  user: {
    index: "#",
    register: "/register",
    activate: "/activate",
    login: "/login",
    logout: "/logout",
  },
  news: "/news",
  blog: { index: "/blog", create: "/blog/create" },
  vision: { index: "/vision" },
};

const domain = process.env.REACT_APP_API_DOMAIN;
const apiUrls = {
  token: { pair: domain + "/token/", refresh: domain + "/token/refresh/" },
  user: {
    crud: domain + "/user/crud/",
    activate: domain + "/user/activate/",
    login: domain + "/user/login/",
    logout: domain + "/user/logout/",
  },
  news: domain + "/news/",
  blog: {
    crud: domain + "/blog/crud/",
  },
};

export { routerUrls, apiUrls };
