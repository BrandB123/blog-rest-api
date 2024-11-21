const jwt = require('jsonwebtoken');

async function verifyUser(req, res, next){
    if (!req.headers['authorization']){
        return res.status(401).send('Missing required headers');
    }
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err){
            return res.status(401).send('Invalid token');
        }
        req.user = decoded.user;
        next();
    });
}

module.exports = verifyUser