const db = require('../db/queries');

async function addComment(req, res, next){
    if (!req.body.message){
        return res.status(422).json({ message: "Comment cannot be blank"})
    }
    await db.addComment(req.user.id, req.params.postid, req.body.message)
    res.json({ message : "Comment added successfully"})
}

module.exports = addComment 