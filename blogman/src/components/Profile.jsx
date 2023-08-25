/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");

      try {
        const userResponse = await fetch(
          "http://localhost:3000/api/user/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        const userProfile = await userResponse.json();
        setUser(userProfile.user);

        const response = await fetch(
          "http://localhost:3000/api/posts/allposts",
          {
            method: "POST",
            headers: {
              authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userProfile.user._id }),
          }
        );

        const postsData = await response.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // ...
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/user/logout", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        // Include any necessary authentication token or payload for logout
      });

      if (response.ok) {
        // Logout successful, perform any necessary actions (e.g., clear user session, redirect)
        localStorage.clear();
        window.location.reload();
      } else {
        // Handle error cases when logout request fails
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("Delete response:", data);

      if (response.ok) {
        // Remove the deleted post from the posts array
        const updatedPosts = posts.filter((post) => post._id !== postId);
        setPosts(updatedPosts);
      } else {
        // Handle the error case
        // ...
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // ...

  const openConfirmationModal = (postId) => {
    setSelectedPostId(postId);
    setOpenModal(true);
  };

  const closeConfirmationModal = () => {
    setSelectedPostId(null);
    setOpenModal(false);
  };

  const handleConfirmation = () => {
    if (selectedPostId) {
      handleDelete(selectedPostId);
      closeConfirmationModal();
    }
  };

  return (
    <div>
      <h1 className="page-title color text-center mb-5 mt-5 text-5xl font-medium leading-tight text-primary">
        HI, {user.name}
      </h1>{" "}
      <p className="page-title color text-center mb-5 mt-5 font-medium text-2xl text-primary">
        welcome to your profile!
      </p>
      <button className="navbar-link">
        <Link className="navbar-link" to="/publish">
          <a
            className="group mt-5 relative inline-block focus:outline-none focus:ring"
            href="/download"
          >
            <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
              Write more
            </span>
          </a>
        </Link>
      </button>
      <div className="flex flex-row flex-wrap justify-between w-full">
        {posts.map((post) => {
          return (
            <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] mt-5 w-[20rem]">
              <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
                <time
                  dateTime="2022-10-10"
                  className="block text-xs text-gray-500"
                >
                  {post.createdAt.slice(0, 10)}
                </time>
                <Link to={`/allposts/${post._id}`}>
                  <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                    {post.title}
                  </h3>
                </Link>
                <div className="mt-4 flex flex-wrap gap-1">
                  <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                    Machine learning
                  </span>

                  <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                    AI
                  </span>
                </div>
                <span className="inline-flex mt-5 overflow-hidden rounded-md border bg-white shadow-sm">
                  <button
                    className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                    title="Edit Product"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>

                  <button
                    className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                    title="Delete Product"
                    onClick={openConfirmationModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </span>
              </div>
            </article>
          );
        })}
      </div>
      <button className="navbar-link" onClick={handleLogout}>
        <a
          className="group mt-5 relative inline-block focus:outline-none focus:ring"
          href="/download"
        >
          <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-red-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
            Log out
          </span>
        </a>
      </button>
      <Modal
        open={openModal}
        onClose={closeConfirmationModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center align-middle mt-5"
      >
        <div
          className=" w-[25rem] h-[13rem]  align-middle rounded-2xl border border-red-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
          role="alert"
        >
          <div className="flex items-center gap-4">
            <span className="shrink-0 rounded-full bg-blue-400 p-2 text-white">
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                  fillRule="evenodd"
                />
              </svg>
            </span>

            <p className="font-medium sm:text-lg">Alert</p>
          </div>

          <p className="mt-4 text-gray-500">
            Are you sure you want to delete this post
          </p>

          <div className="mt-6 sm:flex sm:gap-4">
            <button
              className="inline-block w-full rounded-lg bg-red-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
              onClick={handleConfirmation}
            >
              Delete Post
            </button>

            <button
              className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
              onClick={closeConfirmationModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
