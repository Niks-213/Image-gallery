// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Dev_DB', 'postgres', 'Hpnik@4747', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  // Additional options can be specified here
});

module.exports = sequelize;