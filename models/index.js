const sequelize = require('./sequelize');
const User = require('./user');

sequelize.sync()
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

module.exports = {
    sequelize,
    User,
};
