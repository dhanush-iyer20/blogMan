/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { MyContext } from "../context/StateContext";
import { Navigate } from "react-router-dom";
import bgImage from "../bg.jpg";
const Home = (props) => {
  const { user, setUser, isAuth } = useContext(MyContext);
  if (!isAuth) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div
        style={{
          position: "relative",
          overflow: "auto",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "fixed",
            height: "100%",
            width: "100%",
            overflow: "auto",
          }}
          className="main-container flex justify-between flex-col align-middle"
        >
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </div>
    );
  }
};

export default Home;
