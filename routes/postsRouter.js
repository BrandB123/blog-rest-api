const {Router} = require('express');
const db = require('../db/queries');
const jwt = require('jsonwebtoken');

const postsRouter = Router();

postsRouter.get("/", async (req, res) => { 
    const posts = await db.getAllPosts()
    res.json({ posts }) 
})

postsRouter.get("/:postid", async (req, res) => { 
    const post = await db.getSinglePost(req.params.postid)
    res.json({ post }) 
})

postsRouter.get("/:postid/comments", (req, res,) => { 
    const comments = db.getComments(req.params.postid)
    res.json({ comments }) 
})

module.exports = postsRouter