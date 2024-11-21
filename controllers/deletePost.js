const db = require('../db/queries')

async function deletePost(req, res, next) {
    if (!req.user.author_role){
        return res.status(403).json({ message: "Access Denied - User Role Invalid"})
    }
    await db.deletePostForAuthor(req.params.postid);
    res.json("Post successfully deleted");
}

module.exports = deletePost;