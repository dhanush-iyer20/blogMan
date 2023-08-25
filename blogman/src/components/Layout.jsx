/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>BlogMan</title>
      </Head>
      <section>
        <Navbar />
      </section>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
