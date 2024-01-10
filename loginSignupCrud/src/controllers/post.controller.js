const postService = require("../services/post.service");
const slugify = require("slugify");

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

// const deletePost = async (req, res) => {
//   const postId = req.params.id;

//   try {
//     await postService.deletePostById(postId);
//     res.status(200).json({ message: "Post deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await postService.deletePostById(postId);
    if (deletedPost) {
      res.status(200).json({ message: "Post soft deleted successfully", post: deletedPost });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostByTitle = async (req, res) => {
  const title = req.params.title;

  try {
    const post = await postService.getPostByTitle(title);

    if (post) {
      res.status(200).json({ post });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getById = async (req, res) => {
  let { id } = req.params.id;
  try {
    const post = await postService.getPostById(id);
    
    if (post) {
      const slug = slugify(post.title, { lower: true });

      res.status(200).json({ post, slug });
    } else {

      if(!post){
        const postData = {
          title: req.body.title,
          content: req.body.content,
          slug: req.body.slug,
          userId: userId, 
        };
        const newPost = await postService.createPost(postData); 

        res.status(201).json({ message: "Post created successfully", post: newPost });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPostByTitle,
  getById, 
 
};
