/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  CardActionArea,
  CardActions,
  CircularProgress,
  Grid,
} from "@mui/material";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [postsTemp, setPostsTemp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://localhost:3000/api/posts/allposts",
          {
            headers: {
              authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setPosts(data);
        setPostsTemp(data);
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  const handleSearch = (query) => {
    setPosts(
      postsTemp.filter((post) => {
        if (
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
        ) {
          return post;
        }
      })
    );
    console.log(posts);
  };
  return (
    <div className="posts-page w-full">
      {isLoading ? (
        <CircularProgress className="" /> // Show the loading element if isLoading is true
      ) : (
        <div>
          <h1 className="page-title color text-center mb-5  text-5xl font-medium leading-tight text-primary">
            Read Blogs
          </h1>
          <label
            htmlFor="UserEmail"
            className="relative block overflow-hidden bg-white rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              id="searchInput"
              placeholder="Search"
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
            />

            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              Search
            </span>
          </label>{" "}
          <div className="flex flex-row flex-wrap justify-between w-full">
            {posts.length === 0 ? (
              <span className="mt-5 text-3xl text-white">Nothing Found</span>
            ) : (
              posts.map((post) => {
                return (
                  <Link to={`/allposts/${post._id}`}>
                    <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] mt-5 w-[20rem]">
                      <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
                        <time
                          dateTime="2022-10-10"
                          className="block text-xs text-gray-500"
                        >
                          {post.createdAt.slice(0, 10)}
                        </time>

                        <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                          {post.title}
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-1">
                          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                            Machine learning
                          </span>

                          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                            AI
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsPage;
