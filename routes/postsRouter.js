const {Router} = require('express');
const db = require('../db/queries');
const jwt = require('jsonwebtoken');
const addComment = require('../controllers/addComment');

const postsRouter = Router();

postsRouter.get("/", async (req, res) => { 
    const posts = await db.getAllPosts()
    res.json({ posts }) 
})

postsRouter.get("/:postid", async (req, res) => { 
    const post = await db.getSinglePost(req.params.postid)
    res.json({ post }) 
})

postsRouter.get("/:postid/comments", async (req, res,) => { 
    const comments = await db.getCommentsOnSinglePost(req.params.postid)
    res.json({ comments }) 
})

postsRouter.post("/:postid/comments", (req, res, next) => {
    addComment(req, res, next);
});

module.exports = postsRouter