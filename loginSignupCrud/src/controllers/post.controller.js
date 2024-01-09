const postService = require("../services/post.service");

const createPost = async (req, res) => {
  const userId = req.params.id; // Assuming userId is in req.params
  try {
    const postData = {
      title: req.body.title,
      content: req.body.content,
      slug: req.body.slug,
      userId: userId, // Assigning the userId to the post being created
    };

    const newPost = await postService.createPost(postData); // Pass postData to createPost function
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const newData = req.body;

  try {
    const updatedPost = await postService.updatePostById(postId, newData);
    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    await postService.deletePostById(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
};
