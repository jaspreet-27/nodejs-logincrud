const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

router.post('/:userId', postController.createPost);
router.get('/posts', postController.getAllPosts);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;