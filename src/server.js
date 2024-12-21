const express = require('express');
const cors = require('cors');
const db = require('./models'); // Importar modelos y la conexión Sequelize
const perfumeRoutes = require('./routes/perfumeRoutes');
const decantRoutes = require('./routes/decantRoutes');
const transferRoutes = require('./routes/transferRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Rutas
app.use('/api', perfumeRoutes);
app.use('/api', decantRoutes);
app.use('/api', transferRoutes);

// Prueba de conexión
app.get('/', async (req, res) => {
  try {
    await db.authenticate();
    console.log('Conexión a la base de datos exitosa.');
    res.send('¡Servidor funcionando correctamente!');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});