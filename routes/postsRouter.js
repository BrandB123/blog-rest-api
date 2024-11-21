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

postsRouter.get("/author", 
    verifyUser,
    getAuthorPostsAll
)

postsRouter.get("/:postid/author", 
    verifyUser,
    getAuthorPostsSingle
)

postsRouter.post("/author", 
    verifyUser,
    addPostForAuthor
)

postsRouter.put("/:postid/author", 
    verifyUser,
    updatePost
)

postsRouter.delete("/:postid/author", 
    verifyUser,
    deletePost
)

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

postsRouter.post("/:postid/comments", 
    verifyUser,
    addComment
);

module.exports = postsRouter