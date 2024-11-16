const { post } = require('../routes/userRouter');
const pool = require('./pool');

async function addUser(name, email, password_hash, author_role) {
    try {
        await pool.query(`
            INSERT INTO users (name, email, password_hash, author_role)
            VALUES ($1, $2, $3, $4)`,
            [name, email, password_hash, author_role]
        )
    } catch (err){
        console.error("Error adding user to database: ", err)
    }
}

async function getUserByEmail(email) {
    try {
        const { rows } = await pool.query(`
            SELECT * FROM users
            WHERE email = $1`,
            [email]
        )
        return rows[0]
    } catch(err) {
        console.error("Error obtaining user", err);
    }
}

async function getAllPosts() {
    try {
        const { rows } = await pool.query(`
            SELECT * FROM posts`,
        )
        return rows
    } catch(err) {
        console.error("Error obtaining posts", err);
    } 
}

async function getSinglePost(postId) {
    try {
        const { rows } = await pool.query(`
            SELECT * FROM posts
            WHERE id = $1`,
            [postId]
        )
        return rows
    } catch(err) {
        console.error("Error obtaining post", err);
    } 
}

async function getCommentsOnSinglePost(postId) {
    try{
        const { rows } = await pool.query(`
            SELECT * FROM comments
            WHERE post_id = $1`,
            [postId]
        )
        return rows
    } catch(err) {
        console.error("Error getting comments", err)
    }
}

async function addComment(authorId, postId, message) {
    try {
        await pool.query(`
            INSERT INTO comments (author_id, post_id, message, timestamp)
            VALUES ($1, $2, $3, NOW())`,
            [authorId, postId, message]
        )
    } catch (err){
        console.error("Error adding comment to database: ", err)
    }
    
}


module.exports = { addUser, getUserByEmail, getAllPosts, getSinglePost, getCommentsOnSinglePost, addComment }