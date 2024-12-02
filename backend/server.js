const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const db = require('./config/db');

const app = express();

// Test database connection
db.query('SELECT 1')
    .then(() => {
        console.log('Database connection successful');
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Allow specific frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
    credentials: true, // Allow cookies to be sent with requests
    optionsSuccessStatus: 200 // Ensures a proper response for OPTIONS preflight requests
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Routes
app.use('/api/tasks', taskRoutes);

// Catch-all route for unmatched endpoints
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
