const mysql = require('mysql2');
require('dotenv').config();

// First, create a connection without specifying a database
const initialConnection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
});

// SQL statements for database and table creation
const CREATE_DB_SQL = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'task_management'}`;
const USE_DB_SQL = `USE ${process.env.DB_NAME || 'task_management'}`;
const CREATE_TABLE_SQL = `
    CREATE TABLE IF NOT EXISTS tasks (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

// Initialize database and tables
const initializeDatabase = async () => {
    try {
        // Create database if it doesn't exist
        await initialConnection.promise().query(CREATE_DB_SQL);
        await initialConnection.promise().query(USE_DB_SQL);
        await initialConnection.promise().query(CREATE_TABLE_SQL);
        console.log('Database and tables initialized successfully');
    } catch (err) {
        console.error('Error initializing database:', err);
        throw err;
    }
};

// Create the connection pool (for actual application use)
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'task_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

// Initialize database before exporting
initializeDatabase()
    .then(() => {
        console.log('Database setup complete');
    })
    .catch(err => {
        console.error('Failed to initialize database:', err);
        process.exit(1); // Exit if database setup fails
    });

module.exports = promisePool;
