import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();
function AppContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(function () {
    if (localStorage.getItem("refresh_token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  return useContext(AppContext);
}

export { useAppContext, AppContextProvider };
