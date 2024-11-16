const {Router} = require('express');
const bcrypt = require('bcryptjs')
const indexRouter = Router();

// GET

// indexRouter.get("/users/:userid", (req, res) => { res.json({ message: "This will be a GET route."}) })

indexRouter.get("/posts", (req, res) => { res.json({ message: "This will be a GET route."}) })

indexRouter.get("/posts/:postid", (req, res) => { res.json({ message: "This will be a GET route."}) })

indexRouter.get("/posts/:postid/comments", (req, res,) => { res.json({ message: "This will be a GET route."}) })


// POST
// indexRouter.post("/users", (req, res) => { 
//     // add user to DB if they are not there already

//     // redirect to the sign in page
//     res.json({ message: "This will be a POST route "}) 
// })

indexRouter.post("/posts", (req, res) => { res.json({ message: "This will be a POST route "}) })

indexRouter.post("/posts/:postid/comments", (req, res,) => { res.json({ message: "This will be a POST route "}) })


// PUT
indexRouter.put("/posts/:postid", (req, res) => { res.json({ message: "This will be a PUT route." }) })

indexRouter.put("/posts/:postid/comments/:commentid", (req, res) => { res.json({ message: "This will be a PUT route." }) })


// DELETE
indexRouter.delete("/posts/:postid", (req, res) => { res.json({ message: "This will be a DELETE route." }) })

indexRouter.delete("/posts/:postid/comments/:commentid", (req, res) => { res.json({ message: "This will be a DELETE route." }) })

module.exports = indexRouter;