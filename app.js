// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models'); // Import the sequelize instance
const authRoutes = require('./routes/auth'); // Import authentication routes
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes); // Use authentication routes

// Test endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the authentication middleware API!');
});

// Start the server and sync the database
const startServer = async () => {
    try {
        await sequelize.authenticate(); // Test database connection
        console.log('Database connected successfully.');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
