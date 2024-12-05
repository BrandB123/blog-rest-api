require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cors = require('cors');
const db = require('./db/queries');
const userRouter = require('./routes/userRouter')
const postsRouter = require('./routes/postsRouter')

const app = express();

app.options("*", cors())
app.use(cors({
  origin: [
    "https://blog-rest-reader-site.vercel.app",
    "https://blog-rest-author-site.vercel.app"
  ]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRouter);
app.use("/api/posts", postsRouter);

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await db.getUserByEmail(username)
  
        if (!user) {
          return done(null, false);
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
          return done(null, false)
        }

        return done(null, user);
      } catch(err) {
          return done(err);
      }
    })
);

app.listen(3000, () => console.log("Server running on port 3000"))