const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

router.post('/:userId', postController.createPost);
router.get('/posts', postController.getAllPosts);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

module.exports = router;