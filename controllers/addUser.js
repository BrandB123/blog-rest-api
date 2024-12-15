const bcrypt = require('bcryptjs');
const db = require('../db/queries')

async function addUser(req, res, next){
    const { name, email, password, authorStatus } = req.body

    if (!name || !email || !password){
	return res.status(422).json({ message: "All fields are required" })
    }
    
    if (await db.getUserByEmail(email.toLowerCase())){
        return res.status(409).json({ message: "A user already exists with this email" })
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        try {
            db.addUser(name, email.toLowerCase(), hashedPassword, authorStatus)
        } catch (err) {
            return next(err)
        }
    })

    res.json({ message: "User added successfully" });
}

module.exports = addUser;