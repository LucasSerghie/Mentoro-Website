// app.js

const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3306;

// Create MySQL database connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'Web_Database',
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.message);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Define route to serve HTML admin page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Define route to fetch users from database
app.get('/users', (req, res) => {
    // Execute SQL query to fetch users
    const fetchUsersQuery = 'SELECT * FROM users';
    connection.query(fetchUsersQuery, (err, users) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(users); // Send JSON response with users data
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
