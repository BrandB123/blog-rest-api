const db = require('../db/queries');

async function updatePost(req, res, next){
    if (!req.user.author_role){
        return res.status(403).json({ message: "Access Denied - User Role Invalid"})
    }
    if (!req.body.postTitle || !req.body.postMessage || !req.body.publishedStatus){
        return res.status(422).json({ message: "Missing required fields"})
    }
    const posts = await db.getPostsForAuthor(req.user.id)
    const postTitles = posts
        .filter(post => post.id !== Number(req.params.postid))
        .map(post => post.title)
        
    if (postTitles.includes(req.body.postTitle)){
        return res.status(409).json({ message : "Post title must be unique"})
    }

    await db.updatePostForAuthor(req.user.id, req.body.postTitle, req.body.postMessage, req.body.publishedStatus, req.params.postid)
    res.json({ message : "Post updated successfully"});
}

module.exports = updatePost