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




// get all posts for author
postsRouter.get("/author", (req, res, next) => {
    // confirm we have authorization headers
    // confirm we have a user with author_role true
    // return all posts for user.id
})

// get a post for author
postsRouter.get("/:postid/author", (req, res, next) => {
    // confirm we have authorization headers
    // confirm we have a user with author_role true
    // return posts.id
})

// add a post for author
postsRouter.post("/author", (req, res, next) => {
    // confirm we have authorization headers
    // confirm we have a user with author_role true
    // db.addPost(author_id, title, message, published, timestamp);
})

// update a post for author
postsRouter.put("/:postid/author", (req, res, next) => {
    // confirm we have authorization headers
    // confirm we have a user with author_role true
    // db.updatePost(post_id, author_id, title, message, published, timestamp);
})

// delete post for author
postsRouter.delete("/:postid/author", (req, res, next) => {
    // confirm we have authorization headers
    // confirm we have a user with author_role true
    // db.deletePost(post_id);
})




module.exports = postsRouter