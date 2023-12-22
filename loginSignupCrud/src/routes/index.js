const express = require('express');
const rootRouter = express.Router();
const user = require("../routes/users.route");

rootRouter.use('/user', user)



 module.exports = rootRouter;