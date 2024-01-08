
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  slug: String, 
  userId: { type: mongoose.Types.ObjectId, ref: 'user' },

});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

