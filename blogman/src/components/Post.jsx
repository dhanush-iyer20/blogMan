/* eslint-disable no-unused-vars */
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Input from "./Input";

const Post = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [likes, setLikes] = useState(0);
  const [likeStatus, setLikeStatus] = useState(false);
  const [comments, setComments] = useState([]);
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
        const data = await response.json();
        setPost(data);
        setComments(data.post.comments);
        setLikes(data.post.likes);
        setLikeStatus(data.likeStatus);
        // setYear(data.post.createdAt.getFullYear());
        // setMonth(data.post.createdAt.getMonth() + 1);
        // setDay(data.post.createdAt.getDate());
        console.log(data.post.createdAt.split(0, 10));
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${id}/like`,
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // Handle the response after liking the post
      setLikes(data.likes);
      setLikeStatus(data.likeStatus);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${id}/comment`,
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        }
      );
      const data = await response.json();

      // Update the comments state with the new comment
      setComments(data.post.comments);
      // Clear the comment input
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div>
      {post ? (
        <div>
          <h1 className="mb-5 mt-5">{post.post.title}</h1>
          <p>Made by: {post.post.name}</p>
          <p>{post.post.createdAt.slice(0, 10)}</p>
          <button onClick={handleLike}>
            {likeStatus ? "Unlike" : "Like"} {likes}
          </button>
          <p className="mt-5 max-w-[50rem]">
            {ReactHtmlParser(post.post.content)}
          </p>
          <div className="mb-5 mt-5 max-w-[25rem]">
            <Input
              className="mb-5 max-w-[50rem]"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <button
              className="navbar-link max-w-[50rem]"
              onClick={handleComment}
            >
              <Link className="navbar-link" to="/publish">
                <a
                  className="group mt-5 relative inline-block focus:outline-none focus:ring"
                  href="/download"
                >
                  <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-red-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

                  <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                    Post Comment
                  </span>
                </a>
              </Link>
            </button>
          </div>
          <div>
            <div>
              <h2>Comments</h2>
              {comments ? (
                comments.map((comment) => (
                  <div key={comment._id}>
                    <p>{comment.content}</p>
                    <p>By: {comment.name}</p>
                  </div>
                ))
              ) : (
                <CircularProgress />
              )}
            </div>
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Post;
