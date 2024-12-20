const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { Sequelize } = require('sequelize');

// Configuración para Railway o entorno local
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.NODE_ENV === 'production' ? process.env.DB_HOST : 'localhost',
    dialect: 'mysql',
    port: process.env.NODE_ENV === 'production' ? process.env.DB_PORT : 3306,
    logging: false,
  }
);

module.exports = sequelize;