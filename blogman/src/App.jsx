/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Posts from "./components/Posts";
import Publish from "./components/Publish";
import Profile from "./components/Profile";
import Post from "./components/Post";
import Edit from "./components/Edit";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "allposts",
          element: <Posts />,
        },
        {
          path: "publish",
          element: <Publish />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "allposts/:id",
          element: <Post />,
        },
        {
          path: "profile/:id/edit",
          element: <Edit />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
