const {Router} = require('express');
const db = require('../db/queries');
const verifyUser = require('../controllers/verifyUser');
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

postsRouter.post("/:postid/comments", 
    verifyUser,
    addComment
);

// get all posts for author
postsRouter.get("/author", 
    verifyUser,
    // ADD APPLICABLE CONTROLLER HERE
)

// get a post for author
postsRouter.get("/:postid/author", 
    verifyUser,
    // ADD APPLICABLE CONTROLLER HERE
)

// add a post for author
postsRouter.post("/author", 
    verifyUser,
    // ADD APPLICABLE CONTROLLER HERE
)

// update a post for author
postsRouter.put("/:postid/author", 
    verifyUser,
    // ADD APPLICABLE CONTROLLER HERE
)

// delete post for author
postsRouter.delete("/:postid/author", 
    verifyUser,
    // ADD APPLICABLE CONTROLLER HERE    
)


module.exports = postsRouter