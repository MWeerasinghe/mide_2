const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import the sequelize instance

// Define lib_member_open model
const lib_member_open = sequelize.define('lib_member_open', {
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
  school: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirm_letter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'lib_member_open', // Explicitly define the table name
  timestamps: true, // Include createdAt and updatedAt columns
});

// Export the model
module.exports = lib_member_open;
