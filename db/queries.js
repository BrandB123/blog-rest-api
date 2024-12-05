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
            SELECT * FROM posts`
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
            SELECT comments.id, comments.message, users.name 
            FROM comments
            INNER JOIN users ON comments.author_id=users.id
            WHERE comments.post_id = $1`,
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

async function getPostsForAuthor(authorId){
    try {
        const { rows } = await pool.query(`    
            SELECT * FROM posts
            WHERE author_id = $1`,
            [authorId]
        )
        return rows;
    } catch (err){
        console.error("Error obtaining posts: ", err)
    }
}

async function getSinglePostForAuthor(postId){
    try {
        const { rows } = await pool.query(`    
            SELECT * FROM posts
            WHERE id = $1`,
            [postId]
        )
        return rows[0];
    } catch (err){
        console.error("Error obtaining post: ", err)
    }
}

async function addPostForAuthor(authorId, postTitle, postMessage, publishedStatus){
    try {
        await pool.query(`    
            INSERT INTO posts (author_id, title, message, published, timestamp)
            VALUES ($1, $2, $3, $4, NOW())`,
            [authorId, postTitle, postMessage, publishedStatus]
        )
        console.log("Post added successfully");
    } catch (err){
        console.error("Error adding post: ", err)
    }
}

async function updatePostForAuthor(authorId, postTitle, postMessage, publishedStatus, postId){
    try {
        await pool.query(`    
            UPDATE posts
            SET author_id = $1, title = $2, message = $3, published = $4
            WHERE id = $5`,
            [authorId, postTitle, postMessage, publishedStatus, postId]
        )
    } catch (err){
        console.error("Error updating post: ", err)
    }
}

async function deletePostForAuthor(postId){
    try {
        await pool.query(`    
            DELETE FROM posts
            WHERE id = $1`,
            [postId]
        )
    }    catch (err){
        console.error("Error deleting post: ", err)
    }
}

module.exports = { 
    addUser, 
    getUserByEmail, 
    getAllPosts, 
    getSinglePost, 
    getCommentsOnSinglePost, 
    addComment,
    getPostsForAuthor,
    getSinglePostForAuthor,
    addPostForAuthor,
    updatePostForAuthor,
    deletePostForAuthor
 }