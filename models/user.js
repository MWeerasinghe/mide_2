// models/user.js
const { DataTypes } = require('sequelize');
const sequelize  = require('./sequelize'); // Destructure the sequelize instance

// Define User model
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Export the User model
module.exports = User;
