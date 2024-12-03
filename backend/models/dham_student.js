const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import the sequelize instance

// Define dham_student model
const dham_student = sequelize.define('dham_student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER, // Match the type of the referenced column (usually INTEGER for primary keys)
    allowNull: false,
    references: {
      model: 'Users', // Table name in the database
      key: 'id',      // Column in the Users table being referenced
    },
    onUpdate: 'CASCADE', // Ensures referential integrity on update
    onDelete: 'CASCADE', // Ensures referential integrity on delete
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname_english: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  initials: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  school_grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  school: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dhamma_grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_img: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null if the profile image might not always be provided
  },
  nic_img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'dham_student', // Explicitly define the table name
  timestamps: true, // Include createdAt and updatedAt columns
});

// Export the model
module.exports = dham_student;
