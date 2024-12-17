const express = require('express');
const db = require('./models'); // Importa los modelos y la conexión Sequelize
const Perfume = require('./models').Perfume; // Importa el modelo Perfume

const app = express();
const PORT = 3000;

app.use(express.json());

// Prueba de conexión y consulta
app.get('/', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');

    const perfumes = await Perfume.findAll(); // Consulta a la tabla "Perfume"
    console.log('Consulta realizada correctamente:', perfumes);
    res.json(perfumes);
  } catch (error) {
    console.error('Error al conectar o consultar la base de datos:', error);
    res.status(500).send('Error al conectar o consultar la base de datos');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});