// const { Sequelize } = require('sequelize');

// // Use the DATABASE_URL environment variable
// const databaseUrl = process.env.DATABASE_URL;

// if (!databaseUrl) {
//   throw new Error('DATABASE_URL environment variable is not set.');
// }

// const sequelize = new Sequelize(databaseUrl, {
//   dialect: 'postgres',
//   logging: false, // Disable logging if needed
// });

// module.exports = sequelize;





const { Sequelize } = require('sequelize');

// Create a Sequelize instance with PostgreSQL configuration
const sequelize = new Sequelize('yourdb', 'vajiraramaya', '1001', {
    host: 'localhost',
    dialect: 'postgres', // Specifies PostgreSQL
    port: 5432,          // Default PostgreSQL port
    logging: false,      // Set to true to enable query logging
});

// Export the Sequelize instance
module.exports = { sequelize };
