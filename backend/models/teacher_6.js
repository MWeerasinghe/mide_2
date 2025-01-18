const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import the sequelize instance

// Define User model
const Teacher_6 = sequelize.define('teachers_6', {
    // Adjust the schema based on your table's structure
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grade_6: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    term: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false, // If your table does not have `createdAt` and `updatedAt` columns
  });

module.exports = Teacher_6;
