const express = require('express');
const router = express.Router();
const { Perfume } = require('../models'); // Importa el modelo Perfume

// Obtener todos los perfumes
router.get('/perfumes', async (req, res) => {
  try {
    const perfumes = await Perfume.findAll();
    res.status(200).json(perfumes);
  } catch (error) {
    console.error('Error al obtener perfumes:', error);
    res.status(500).send('Error al obtener perfumes');
  }
});

// Obtener un perfume por ID
router.get('/perfumes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el ID sea un número válido
    if (isNaN(id)) {
      return res.status(400).send('El ID debe ser un número válido.');
    }

    const perfume = await Perfume.findByPk(id);
    if (perfume) {
      res.status(200).json(perfume);
    } else {
      res.status(404).send('Perfume no encontrado.');
    }
  } catch (error) {
    console.error('Error al obtener perfume:', error);
    res.status(500).send('Error al obtener perfume.');
  }
});

// Agregar un nuevo perfume
router.post('/perfumes', async (req, res) => {
  try {
    const { name, total_ml, remaining_ml, status } = req.body;

    // Validar campos obligatorios
    if (!name || !total_ml || !remaining_ml || !status) {
      return res.status(400).send('Todos los campos (name, total_ml, remaining_ml, status) son obligatorios.');
    }

    // Validar que total_ml y remaining_ml sean números positivos
    if (total_ml <= 0 || remaining_ml < 0) {
      return res.status(400).send('total_ml debe ser mayor a 0 y remaining_ml no puede ser negativo.');
    }

    const nuevoPerfume = await Perfume.create({
      name,
      total_ml,
      remaining_ml,
      status,
    });
    res.status(201).json(nuevoPerfume);
  } catch (error) {
    console.error('Error al crear perfume:', error);
    res.status(500).send('Error al crear perfume.');
  }
});

// Actualizar un perfume
router.put('/perfumes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, total_ml, remaining_ml, status } = req.body;

    // Validar que el ID sea un número válido
    if (isNaN(id)) {
      return res.status(400).send('El ID debe ser un número válido.');
    }

    // Validar campos obligatorios
    if (!name || !total_ml || !remaining_ml || !status) {
      return res.status(400).send('Todos los campos (name, total_ml, remaining_ml, status) son obligatorios.');
    }

    // Validar que total_ml y remaining_ml sean números positivos
    if (total_ml <= 0 || remaining_ml < 0) {
      return res.status(400).send('total_ml debe ser mayor a 0 y remaining_ml no puede ser negativo.');
    }

    const perfume = await Perfume.findByPk(id);

    if (perfume) {
      await perfume.update({ name, total_ml, remaining_ml, status });
      res.status(200).json(perfume);
    } else {
      res.status(404).send('Perfume no encontrado.');
    }
  } catch (error) {
    console.error('Error al actualizar perfume:', error);
    res.status(500).send('Error al actualizar perfume.');
  }
});

// Eliminar un perfume
router.delete('/perfumes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el ID sea un número válido
    if (isNaN(id)) {
      return res.status(400).send('El ID debe ser un número válido.');
    }

    const perfume = await Perfume.findByPk(id);

    if (perfume) {
      await perfume.destroy();
      res.status(204).send(); // No Content
    } else {
      res.status(404).send('Perfume no encontrado.');
    }
  } catch (error) {
    console.error('Error al eliminar perfume:', error);
    res.status(500).send('Error al eliminar perfume.');
  }
});

module.exports = router;