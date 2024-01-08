
const Post = require('../models/post.schema');

const createPost = async (postData) => {
  return await Post.create(postData);
};

const getPostById = async (postId) => {
  return await Post.findById(postId);
};

const updatePostById = async (postId, updatedData) => {
  return await Post.findByIdAndUpdate(postId, updatedData, { new: true });
};

const deletePostById = async (postId) => {
  return await Post.findByIdAndDelete(postId);
};

module.exports = {
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
};

