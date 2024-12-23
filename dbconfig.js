const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'users.db');

console.log('Database running on :', dbPath);
// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
        return;
    }
    console.log('Connected to database');
    // creates table 'users'
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Table creation error:', err);
        } else {
            console.log('Users table created.');
        }
    });
});

module.exports = db;
