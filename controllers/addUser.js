const bcrypt = require('bcryptjs');
const db = require('../db/queries')

async function addUser(req, res, next){
    const { name, email, password, authorStatus } = req.body

    // confirm all fields are completed
    if (!name || !email || !password){
	return res.status(400).json({ message: "All fields are required" })
    }
    
    // check if user in db
    if (db.getUserByEmail(email)){
        return res.status(409).json({ message: "A user already exists with this email" })
    }

    // add user to db
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        try {
            db.addUser(name, email, hashedPassword, authorStatus)
        } catch (err) {
            return next(err)
        }
    })

    res.redirect("/api/login");
}

module.exports = addUser;