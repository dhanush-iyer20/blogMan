const Post = require("../model/postsModel");
const User = require("../model/userModels");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
const getComments = async (req, res) => {
  console.log("i reached here");
  res.status(200).json({ msg: "Success" });
};
const getLikeStatus = async (req, res) => {
  try {
    const postId = req.params.id;
    const { email } = req.userId;
    const user = await User.findOne({ email });
    const updatedPost = await Post.findById(postId);
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (updatedPost.likedUser.includes(user._id)) {
      return res
        .status(200)
        .json({ likes: updatedPost.likes, likeStatus: true });
    } else {
      return res
        .status(200)
        .json({ likes: updatedPost.likes, likeStatus: false });
    }
  } catch (error) {
    console.error("An error occurred while updating post likes", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { email } = req.userId;
    const user = await User.findOne({ email });
    const updatedPost = await Post.findById(postId);
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (updatedPost.likedUser.includes(user._id)) {
      console.log("user exists");
      updatedPost.likes = updatedPost.likes - 1;
      updatedPost.likedUser = updatedPost.likedUser.filter((item) => {
        item !== user._id;
      });
      console.log(updatedPost.likedUser, user._id.toString());
      updatedPost.save();
      return res
        .status(200)
        .json({ likes: updatedPost.likes, likeStatus: false });
    } else {
      console.log("user does not exist");
      updatedPost.likes = updatedPost.likes + 1;
      updatedPost.likedUser.push(user._id);
      updatedPost.save();
      console.log(updatedPost);
      return res
        .status(200)
        .json({ likes: updatedPost.likes, likeStatus: true });
    }
  } catch (error) {
    console.error("An error occurred while updating post likes", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const dislikePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $dec: { likes: 1 } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    console.log(updatedPost);
    return res.status(200).json({ likes: updatedPost.likes });
  } catch (error) {
    console.error("An error occurred while updating post likes", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;
  const { email } = req.userId;
  const user = await User.findOne({ email });
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.likedUser.includes(user._id)) {
      return res.status(200).json({ post, likeStatus: true });
    } else {
      return res.status(200).json({ post, likeStatus: false });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const publishPost = async (req, res) => {
  const { title, content } = req.body;
  const { name, email } = req.userId;
  const user = await User.findOne({ email });
  try {
    const post = await Post.create({ title, content, name, author: user._id });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const postComment = async (req, res) => {
  const postId = req.params.id;
  const { comment } = req.body;
  const { name, email } = req.userId;
  const user = await User.findOne({ email });
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const commentPosted = { user: user._id, content: comment, name };
    post.comments.push(commentPosted);
    await post.save();
    res.status(201).json({ post });
    console.log(postId, comment, email);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { title, content, updatedAt: Date.now() },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const getPostsOfOneUser = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const posts = await Post.find({ author: userId });
    if (!posts) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
module.exports = {
  getAllPosts,
  getPostById,
  publishPost,
  postComment,
  updatePost,
  getPostsOfOneUser,
  deletePost,
  getComments,
  likePost,
  dislikePost,
};
