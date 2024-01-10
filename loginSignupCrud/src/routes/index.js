const express = require('express');
const rootRouter = express.Router();
const user = require("../routes/users.routes");
const post = require("../routes/post.routes");

rootRouter.use('/user', user)
rootRouter.use('/post',post);
rootRouter.use('/*', (req,res)=>{
    res.send(404);
});


 module.exports = rootRouter;