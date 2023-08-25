/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../context/StateContext";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(MyContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const post = await response.json();
          setTitle(post.post.title);
          setContent(post.post.content);
          console.log(post);
        } else {
          console.error("Failed to fetch blog post for editing");
        }
      } catch (error) {
        console.error("An error occurred while fetching the blog post", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        console.log("Blog post updated successfully!");
      } else {
        console.error("Failed to update blog post");
      }
    } catch (error) {
      console.error("An error occurred while updating the blog post", error);
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Edit your blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-container">
            <textarea
              name="content"
              placeholder="Blog Content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button className="submit-button" type="submit">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
