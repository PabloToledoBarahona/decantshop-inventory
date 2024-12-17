const express = require('express');
const router = express.Router();
const { Decant, Perfume } = require('../models'); // Importa los modelos

// Obtener todos los decants
router.get('/decants', async (req, res) => {
  try {
    const decants = await Decant.findAll({
      include: [
        {
          model: Perfume,
          as: 'perfume', // Especificar alias correcto
        },
      ],
    });
    res.status(200).json(decants);
  } catch (error) {
    console.error('Error al obtener decants:', error);
    res.status(500).send('Error al obtener decants');
  }
});

// Agregar un nuevo decant
router.post('/decants', async (req, res) => {
  try {
    const { perfume_id, cantidad, maleta_destino } = req.body;

    const perfume = await Perfume.findByPk(perfume_id);
    if (!perfume) {
      return res.status(404).send('Perfume no encontrado');
    }

    if (perfume.remaining_ml < cantidad) {
      return res.status(400).send('No hay suficiente cantidad en el perfume');
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
    console.error('Error al agregar decant:', error);
    res.status(500).send('Error al agregar decant');
  }
});

// Eliminar un decant
router.delete('/decants/:id', async (req, res) => {
  try {
    const decant = await Decant.findByPk(req.params.id);

    if (!decant) {
      return res.status(404).send('Decant no encontrado');
    }

    const perfume = await Perfume.findByPk(decant.perfume_id);
    if (perfume) {
      perfume.remaining_ml += decant.cantidad;
      await perfume.save();
    }

    await decant.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar decant:', error);
    res.status(500).send('Error al eliminar decant');
  }
});

// Obtener los decants por maleta
router.get('/decants/maleta/:maleta_destino', async (req, res) => {
  try {
    const { maleta_destino } = req.params;
    const decants = await Decant.findAll({
      where: { maleta_destino },
      include: [
        {
          model: Perfume,
          as: 'perfume', // Especificar alias correcto
        },
      ],
    });
    res.status(200).json(decants);
  } catch (error) {
    console.error('Error al obtener decants por maleta:', error);
    res.status(500).send('Error al obtener decants por maleta');
  }
});

module.exports = router;