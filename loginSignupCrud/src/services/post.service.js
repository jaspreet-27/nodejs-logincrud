
const Post = require('../models/post.schema');

const createPost = async (postData) => {
  return await Post.create(postData);
};
const getAllPosts = async () => {
  return await Post.find(); // Retrieve all posts
};

const getPostById = async (postId) => {
  return await Post.findById(postId);
};
// const updatePost = async (postId)=>{
//   return await Post.findBtIdAndUpadate(postId)
// }

const updatePostById = async (postId, updatedData) => {
  return await Post.findByIdAndUpdate(postId, updatedData, { new: true });
};

const deletePostById = async (postId) => {
  return await Post.findByIdAndDelete(postId);
};

module.exports = {
  createPost,
  getPostById,
  getAllPosts,
  // updatePost ,
  updatePostById,
  deletePostById,
};

