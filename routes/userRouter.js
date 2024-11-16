// require('dotenv').config();
const {Router} = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const addUser = require('../controllers/addUser');

const userRouter = Router();

userRouter.post("/signup", (req, res, next) => {
    addUser(req, res, next)
})

userRouter.post("/login", (req, res, next) => {
    passport.authenticate('local', { session: false }, 
	(err, user, info) => {
	    if (err){
            return next(err)
        };

	    if (!user){
            return res.status(401).json({ message : "Authentication Failed" })
        };

	    const token = jwt.sign(
            { user },
            process.env.SECRET_KEY,
            { expiresIn: "24h"}
        );

	    res.json({ message : "login successful", token});
	})(req, res, next);
});


module.exports = userRouter