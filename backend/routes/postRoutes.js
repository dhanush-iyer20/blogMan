const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  publishPost,
  updatePost,
  getPostsOfOneUser,
  getPostById,
  deletePost,
  postComment,
  getComments,
  likePost,
  dislikePost,
} = require("../controllers/postActions");
router.route("/allposts").get(getAllPosts).post(getPostsOfOneUser);
router.route("/:id").get(getPostById).delete(deletePost).patch(updatePost);
router.route("/:id/comment").post(postComment);
router.route("/:id/comments").post(getComments);
router.route("/:id/like").post(likePost);
router.route("/:id/dislikePost").post(dislikePost);
router.route("/publish").post(publishPost);
module.exports = router;
