const express = require('express');
const cors = require('cors');
const db = require('./models');
const perfumeRoutes = require('./routes/perfumeRoutes');
const decantRoutes = require('./routes/decantRoutes');
const transferRoutes = require('./routes/transferRoutes');
const proveedoresRoutes = require('./routes/proveedoresRoutes'); 
const clientesRoutes = require('./routes/clientesRoutes'); 
const vendedoresRoutes = require('./routes/vendedoresRoutes'); 
const ventasRoutes = require('./routes/ventasRoutes');

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
app.use('/api/perfumes', perfumeRoutes);
app.use('/api/decants', decantRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/vendedores', vendedoresRoutes);
app.use('/api/ventas', ventasRoutes);

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

// ✅ Sincronizar la base de datos (¡Solo en desarrollo!)
if (process.env.NODE_ENV !== 'production') {
  db.sequelize.sync({ force: false })
    .then(() => {
      console.log('✅ Tablas sincronizadas correctamente.');
    })
    .catch((error) => {
      console.error('❌ Error al sincronizar las tablas:', error);
    });
}

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

// ✅ Mostrar todas las rutas disponibles (para depuración)
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`Ruta: ${middleware.route.path}`);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(`Ruta: ${handler.route.path}`);
      }
    });
  }
});

db.sequelize.sync({ force: false }) // Asegúrate de no usar { force: true } en producción
  .then(() => {
    console.log('✅ Tablas sincronizadas correctamente.');
  })
  .catch((error) => {
    console.error('❌ Error al sincronizar las tablas:', error);
  });

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(`Ruta: ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          console.log(`Ruta: ${handler.route.path}`);
        }
      });
    }
  });