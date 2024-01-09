const Post = require("../models/post.schema");
const mongoose = require("mongoose");

const createPost = async (postData) => {
  return await Post.create(postData);
};
const getAllPosts = async () => {
  return await Post.find(); // Retrieve all posts
};

const getPostById = async (postId) => {
  return await Post.findById(postId);
};
const updatePostById = async (postId, updatedData) => {
  return await Post.findByIdAndUpdate(postId, updatedData, { new: true });
};
// const deletePostById = async (postId) => {
//   return await Post.findByIdAndDelete(postId);
// };
const deletePostById = async (postId) => {
  return await Post.findByIdAndUpdate(postId, { isDeleted: true }, { new: true });
};
const getPostByTitle = async (title) => {
  try {
    // const post = await Post.findOne({ title: { $regex: new RegExp(title, "i") } });
    const criteria = {};  
    criteria.$or = [];

    if(mongoose.Types.ObjectId.isValid(title)) {
      criteria.$or.push({ _id: title })
    }

    criteria.$or.push({ slug: title })
    const post = await Post.findOne(criteria);
    return {
      status : true,
      message : 'success',
      payload : post,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  createPost,
  getPostById,
  getAllPosts,
  updatePostById,
  deletePostById,
  getPostByTitle,
  
};
