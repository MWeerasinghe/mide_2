const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import the sequelize instance

// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
  landline: {
    type: DataTypes.STRING,
    allowNull: true, // Set to `true` if the column can accept null values
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Users',
  timestamps: true,
});

module.exports = User;
