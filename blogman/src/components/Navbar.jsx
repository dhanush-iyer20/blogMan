/* eslint-disable no-unused-vars */
import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar flex justify-between w-full">
      <div className="">
        <Link to="/allposts">
          <img src={Logo} alt="Logo" className="" />
        </Link>
      </div>
      <Link to="/profile" className="link">
        Profile
      </Link>
    </div>
  );
};

export default Navbar;
