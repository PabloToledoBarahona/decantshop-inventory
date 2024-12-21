const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
require('dotenv').config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

console.log('Iniciando configuración de base de datos...');
console.log('Ambiente:', env);
console.log('Host:', config.host);
console.log('Puerto:', config.port);
console.log('Base de datos:', config.database);

const db = {};
let sequelize;

try {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      dialectOptions: config.dialectOptions,
      pool: config.pool,
      logging: config.logging
    }
  );

  console.log('Instancia de Sequelize creada');
} catch (error) {
  console.error('Error al crear instancia de Sequelize:', error);
  process.exit(1);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    try {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
      console.log(`Modelo cargado: ${model.name}`);
    } catch (error) {
      console.error(`Error al cargar el modelo ${file}:`, error);
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    try {
      db[modelName].associate(db);
      console.log(`Asociaciones cargadas para: ${modelName}`);
    } catch (error) {
      console.error(`Error al asociar el modelo ${modelName}:`, error);
    }
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;