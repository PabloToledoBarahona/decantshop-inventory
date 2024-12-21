const express = require('express');
const cors = require('cors');
const db = require('./models');
const perfumeRoutes = require('./routes/perfumeRoutes');
const decantRoutes = require('./routes/decantRoutes');
const transferRoutes = require('./routes/transferRoutes');
require('dotenv').config();

const app = express();

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Ruta básica de salud
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Prueba de conexión a la base de datos
app.get('/', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
    res.send('¡Servidor funcionando correctamente!');
  } catch (error) {
    console.error('Error de conexión:', error);
    res.status(500).json({
      error: 'Error al conectar con la base de datos',
      details: error.message
    });
  }
});

// Rutas de la API
app.use('/api', perfumeRoutes);
app.use('/api', decantRoutes);
app.use('/api', transferRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido. Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});