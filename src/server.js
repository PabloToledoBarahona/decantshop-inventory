const express = require('express');
const db = require('./models'); // Importar modelos y la conexión Sequelize
const perfumeRoutes = require('./routes/perfumeRoutes'); // Importar las rutas
const decantRoutes = require('./routes/decantRoutes'); // Importar las rutas de decants

const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas para perfumes
app.use('/api', perfumeRoutes);

// Ruta para decants
app.use('/api', decantRoutes);

// Prueba de conexión
app.get('/', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');
    res.send('¡Servidor funcionando correctamente!');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});