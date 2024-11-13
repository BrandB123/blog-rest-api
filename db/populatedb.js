#! /usr/bin/env node

require('dotenv').config();
const {Client} = require('pg');

const SQL = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ) NOT NULL,
    email VARCHAR ( 255 ) NOT NULL UNIQUE,
    password_hash VARCHAR (255 ) NOT NULL,
    author_role BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS posts(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author_id INTEGER REFERENCES users(id),
    title VARCHAR ( 255 ) NOT NULL,
    message VARCHAR ( 3000 ) NOT NULL,
    published BOOLEAN NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS comments(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id),
    message VARCHAR ( 500 ) NOT NULL,
    timestamp TIMESTAMP NOT NULL
);
`

async function main(){
    console.log("seeding...");
    try{
        const client = new Client({
            connectionString: process.env.DATABASE_PUBLIC_URL
        })
        await client.connect();
        await client.query(SQL);
        await client.end();
        console.log("done");
    } catch(err) {
        console.error(err)
    }
}

main()