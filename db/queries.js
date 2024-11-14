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

module.exports = {}