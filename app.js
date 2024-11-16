const express = require('express');
const bcrypt = require('bcryptjs');
// const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cors = require('cors');
const db = require('./db/queries');
const pool = require('./db/pool')
const userRouter = require('./routes/userRouter')
const postsRouter = require('./routes/postsRouter')

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRouter);
app.use("/api/posts", postsRouter);

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [username]);
        const user = rows[0];
  
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

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });
  
// passport.deserializeUser(async (id, done) => {
//     try {
//       const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//       const user = rows[0];
  
//       done(null, user);
//     } catch(err) {
//       done(err);
//     }
// });

app.listen(3000, () => console.log("Server running on port 3000"))