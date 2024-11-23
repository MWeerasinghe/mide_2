// models/index.js
const sequelize = require('./sequelize'); // Import the Sequelize instance
const User = require('./user'); // Import the User model

// Export both the sequelize instance and the User model
module.exports = { sequelize, User };
