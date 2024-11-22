const {Router} = require('express');
const db = require('../db/queries');
const verifyUser = require('../controllers/verifyUser');
const addComment = require('../controllers/addComment');
const getAuthorPostsAll = require('../controllers/getAuthorPostsAll');
const getAuthorPostsSingle = require('../controllers/getAuthorPostsSingle');
const addPostForAuthor = require('../controllers/addPostForAuthor');
const updatePost = require('../controllers/updatePost');
const deletePost = require('../controllers/deletePost');

const postsRouter = Router();

//get all posts from an author
postsRouter.get("/author", 
    verifyUser,
    getAuthorPostsAll
)

// get a post from an author
postsRouter.get("/:postid/author", 
    verifyUser,
    getAuthorPostsSingle
)

// add a post
postsRouter.post("/author", 
    verifyUser,
    addPostForAuthor
)

// update a post
postsRouter.put("/:postid/author", 
    verifyUser,
    updatePost
)

// delete a post
postsRouter.delete("/:postid/author", 
    verifyUser,
    deletePost
)

// get all posts
postsRouter.get("/", async (req, res) => { 
    const posts = await db.getAllPosts()
    res.json({ posts }) 
})

// get a post from a post id
postsRouter.get("/:postid", async (req, res) => { 
    const post = await db.getSinglePost(req.params.postid)
    res.json({ post }) 
})

// get comments on a post
postsRouter.get("/:postid/comments", async (req, res,) => { 
    const comments = await db.getCommentsOnSinglePost(req.params.postid)
    res.json({ comments }) 
})

// add a post
postsRouter.post("/:postid/comments", 
    verifyUser,
    addComment
);

module.exports = postsRouter