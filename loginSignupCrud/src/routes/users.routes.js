const express = require('express')
const router = express.Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require("../middleware/verify")


router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/update/:id', authMiddleware, userController.updateUser);
router.put('/user/:id/delete', authMiddleware, userController. deleteUser);


module.exports = router;    