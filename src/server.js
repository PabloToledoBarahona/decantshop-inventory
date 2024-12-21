const express = require('express');
const cors = require('cors');
const db = require('./models'); // Importar modelos y la conexión Sequelize
const perfumeRoutes = require('./routes/perfumeRoutes');
const decantRoutes = require('./routes/decantRoutes');
const transferRoutes = require('./routes/transferRoutes');
require('dotenv').config();

const app = express();

// ✅ Configurar CORS correctamente
app.use(cors({
  origin: '*', // Permitir todas las solicitudes (puedes especificar dominios si es necesario)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Middleware para parsear JSON
app.use(express.json());

const PORT = process.env.PORT || 8080;

// ✅ Rutas específicas para funcionalidades
app.use('/api', perfumeRoutes);
app.use('/api', decantRoutes);
app.use('/api', transferRoutes);

// ✅ Prueba de conexión a la base de datos
app.get('/ping-db', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.status(200).send('✅ Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    res.status(500).send('❌ Error al conectar con la base de datos.');
  }
});

// ✅ Ruta raíz
app.get('/', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa.');
    res.send('¡Servidor funcionando correctamente!');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    res.status(500).send('❌ Error al conectar a la base de datos');
  }
});

// ✅ Ruta de prueba de conexión directa a la base de datos
app.get('/test-db', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.status(200).send('✅ Conexión a la base de datos exitosa desde Railway.');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    res.status(500).send('❌ Error al conectar con la base de datos.');
  }
});

// ✅ Manejador de rutas no encontradas (colocado al final)
app.use('*', (req, res) => {
  res.status(404).send('❌ Ruta no encontrada. Asegúrate de usar una ruta válida.');
});

// ✅ Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('❌ ¡Algo salió mal!');
});

// ✅ Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});