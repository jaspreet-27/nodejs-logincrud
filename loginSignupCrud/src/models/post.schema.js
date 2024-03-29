
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true, 
  },
  content: String,
  slug: String, 
  userId: { type: mongoose.Types.ObjectId, ref: 'user' },

});
// postSchema.pre('save', function(next) {
//   if (!this.slug) {
//     this.slug = this.title.toLowerCase().replace(/ /g, "-");
//   }
//   next();
// });
const Post = mongoose.model("Post", postSchema);
module.exports = Post;

