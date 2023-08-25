/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { MyContext } from "../context/StateContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(content);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/api/posts/publish", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        // Post request successful
        console.log("Blog post published successfully!");
      } else {
        // Handle error response
        console.error("Failed to publish blog post");
      }
    } catch (error) {
      console.error("An error occurred while publishing the blog post", error);
    }
  };

  return (
    <div>
      <div className="container">
        <h1 className="page-title text-center mb-2 mt-5 text-5xl font-medium leading-tight text-primary">
          Write your blog
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label
            htmlFor="UserEmail"
            className="relative block  w-full overflow-hidden bg-white rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              id="UserEmail"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />

            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              Title
            </span>
          </label>
          <ReactQuill
            theme="snow"
            className="h-[20rem] m-5 bg-white w-full"
            onChange={(e) => setContent(e)}
          />
          <button className="submit-button" type="submit">
            <span className="navbar-link">
              <span className="group mt-5 relative inline-block focus:outline-none focus:ring">
                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

                <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                  Submit
                </span>
              </span>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Publish;
