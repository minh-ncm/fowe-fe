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

const apiUrls = {
  fowe: { disabled: "/api/disabled/" },
  token: { pair: "/api/token/", refresh: "/api/token/refresh/" },
  user: {
    crud: "api/user/crud/",
    activate: "api/user/activate/",
    login: "/api/user/login/",
    logout: "/api/user/logout/",
  },
  news: "/api/news/",
  blog: {
    index: "/api/blog/",
    crud: "/api/blog/crud/",
  },
};

export { routerUrls, apiUrls };
