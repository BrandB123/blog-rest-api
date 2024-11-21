const db = require('../db/queries');

async function getAuthorPostsAll(req, res, next){
    if (!req.user.author_role){
        return res.status(403).json({ message: "Access Denied - User Role Invalid"})
    }
    const posts = await db.getPostsForAuthor(req.user.id)
    res.json({ posts })
}

module.exports = getAuthorPostsAll 