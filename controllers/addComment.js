const jwt = require('jsonwebtoken');
const db = require('../db/queries');


async function addComment(req, res, next){
    if (!req.headers['authorization']){
        return res.status(401).send('Missing required headers');
    }
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err){
            return res.status(401).send('Invalid token');
        }
        db.addComment(decoded.user.id, req.params.postid, req.body.message || "message pending")
        res.json({ message : "Comment added successfully"})
    });
}


module.exports = addComment 