const { Sequelize } = require('sequelize');

// Use the DATABASE_URL environment variable
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set.');
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false, // Disable logging if needed
});

module.exports = sequelize;
