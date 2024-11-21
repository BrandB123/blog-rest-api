const db = require('../db/queries');

async function getAuthorPostsSingle(req, res, next){
    if (!req.user.author_role){
        return res.status(403).json({ message: "Access Denied - User Role Invalid"})
    }
    const post = await db.getSinglePostForAuthor(req.params.postid)
    res.json({ post })
}

module.exports = getAuthorPostsSingle