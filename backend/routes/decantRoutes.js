const express = require('express');
const router = express.Router();
const { Decant, Perfume } = require('../models'); // Importa los modelos
const { Sequelize } = require('sequelize'); // Importar Sequelize para funciones agregadas

// ✅ Obtener todos los decants
router.get('/', async (req, res) => {
  try {
    const decants = await Decant.findAll({
      include: [
        {
          model: Perfume,
          as: 'perfume', // Asegúrate de que este alias coincida en el modelo
        },
      ],
    });
    res.status(200).json(decants);
  } catch (error) {
    console.error('❌ Error al obtener decants:', error);
    res.status(500).send('❌ Error al obtener decants');
  }
});

// ✅ Obtener Decants por Maleta
router.get('/maleta/:maleta_destino', async (req, res) => {
  try {
    const { maleta_destino } = req.params;

    const maletasPermitidas = ['Pablo', 'Jose Carlos'];
    if (!maletasPermitidas.includes(maleta_destino)) {
      return res.status(400).send('❌ Maleta destino no válida. Use "Pablo" o "Jose Carlos".');
    }

    const decants = await Decant.findAll({
      where: { maleta_destino },
      include: [
        {
          model: Perfume,
          as: 'perfume',
        },
      ],
    });

    res.status(200).json(decants);
  } catch (error) {
    console.error('❌ Error al obtener decants por maleta:', error);
    res.status(500).send('❌ Error al obtener decants por maleta');
  }
});

// ✅ Agregar un nuevo decant
router.post('/', async (req, res) => {
  try {
    const { perfume_id, cantidad, maleta_destino } = req.body;

    if (!perfume_id || !cantidad || !maleta_destino) {
      return res.status(400).send('❌ Todos los campos son obligatorios.');
    }

    if (cantidad <= 0) {
      return res.status(400).send('❌ La cantidad debe ser un número positivo.');
    }

    const maletasPermitidas = ['Pablo', 'Jose Carlos'];
    if (!maletasPermitidas.includes(maleta_destino)) {
      return res.status(400).send('❌ Maleta destino no válida.');
    }

    const perfume = await Perfume.findByPk(perfume_id);
    if (!perfume) {
      return res.status(404).send('❌ Perfume no encontrado.');
    }

    if (perfume.remaining_ml < cantidad) {
      return res.status(400).send('❌ No hay suficiente cantidad disponible.');
    }

    const nuevoDecant = await Decant.create({
      perfume_id,
      cantidad,
      maleta_destino,
    });

    perfume.remaining_ml -= cantidad;
    await perfume.save();

    res.status(201).json(nuevoDecant);
  } catch (error) {
    console.error('❌ Error al agregar decant:', error);
    res.status(500).send('❌ Error al agregar decant');
  }
});

// ✅ Eliminar un Decant
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send('❌ El ID debe ser un número válido.');
    }

    const decant = await Decant.findByPk(id);
    if (!decant) {
      return res.status(404).send('❌ Decant no encontrado.');
    }

    const perfume = await Perfume.findByPk(decant.perfume_id);
    if (perfume) {
      perfume.remaining_ml += decant.cantidad;
      await perfume.save();
    }

    await decant.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('❌ Error al eliminar decant:', error);
    res.status(500).send('❌ Error al eliminar decant');
  }
});

// ✅ Resumen de Decants
router.get('/resumen', async (req, res) => {
  try {
    const resumen = await Decant.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('cantidad')), 'totalMlDecants'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalDecants'],
      ],
      raw: true,
    });

    const porMaleta = await Decant.findAll({
      attributes: [
        'maleta_destino',
        [Sequelize.fn('SUM', Sequelize.col('cantidad')), 'totalMlPorMaleta'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalDecantsPorMaleta'],
      ],
      group: ['maleta_destino'],
      raw: true,
    });

    res.status(200).json({ resumen, porMaleta });
  } catch (error) {
    console.error('❌ Error al obtener resumen de decants:', error);
    res.status(500).send('❌ Error al obtener resumen de decants');
  }
});

module.exports = router;