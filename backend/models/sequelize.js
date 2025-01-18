const { Sequelize } = require('sequelize');

// Use the DATABASE_URL environment variable
const databaseUrl = "postgres://postgres:1001@localhost:5432/vajira";
// const databaseUrl = "postgres://zeus:yourpassword@db:5432/yourdb";

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set.');
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false, // Disable logging if needed
});

module.exports = sequelize;