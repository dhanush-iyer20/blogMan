/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// MyContext.js
import { createContext, useState, useEffect } from "react";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [posts, setPosts] = useState({});
  const testvar = "TestVar";
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("isAuth");
    if (loggedInUser) {
      setIsAuth(loggedInUser);
    }
  }, []);
  const contextData = {
    user,
    setUser,
    isAuth,
    setIsAuth,
    testvar,
    posts,
    setPosts,
  };

  return (
    <MyContext.Provider value={contextData}>{children}</MyContext.Provider>
  );
};

export { MyContextProvider, MyContext };
