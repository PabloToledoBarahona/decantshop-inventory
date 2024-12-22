const express = require('express');
const router = express.Router();
const { Perfume } = require('../models'); // Importa el modelo Perfume

/** ✅ RUTAS ESPECÍFICAS (Primero las rutas más específicas para evitar colisiones) **/

// 🧴 Resumen del inventario
router.get('/resumen', async (req, res) => {
  try {
    const perfumes = await Perfume.findAll({
      attributes: ['id', 'name', 'total_ml', 'remaining_ml', 'status'],
    });

    const totalPerfumes = perfumes.length;
    const totalMlRestantes = perfumes.reduce((sum, perfume) => sum + perfume.remaining_ml, 0);
    const perfumesDisponibles = perfumes.filter(perfume => perfume.status === 'Disponible').length;
    const perfumesNoDisponibles = perfumes.filter(perfume => perfume.status !== 'Disponible').length;

    const resumen = {
      totalPerfumes,
      totalMlRestantes,
      perfumesDisponibles,
      perfumesNoDisponibles,
      detallePerfumes: perfumes,
    };

    res.status(200).json(resumen);
  } catch (error) {
    console.error('❌ Error al obtener el resumen del inventario:', error);
    res.status(500).send('❌ Error al obtener el resumen del inventario');
  }
});

/** ✅ RUTAS CRUD **/

// 🧴 Obtener todos los perfumes
router.get('/', async (req, res) => {
  try {
    const perfumes = await Perfume.findAll();
    res.status(200).json(perfumes);
  } catch (error) {
    console.error('❌ Error al obtener perfumes:', error);
    res.status(500).send('❌ Error al obtener perfumes');
  }
});

// 🧴 Obtener un perfume por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send('❌ El ID debe ser un número válido.');
    }

    const perfume = await Perfume.findByPk(id);
    if (perfume) {
      res.status(200).json(perfume);
    } else {
      res.status(404).send('❌ Perfume no encontrado.');
    }
  } catch (error) {
    console.error('❌ Error al obtener perfume:', error);
    res.status(500).send('❌ Error al obtener perfume.');
  }
});

// 🧴 Agregar un nuevo perfume
router.post('/', async (req, res) => {
  try {
    const { name, total_ml, remaining_ml, status } = req.body;

    if (!name || !total_ml || !remaining_ml || !status) {
      return res.status(400).send('❌ Todos los campos son obligatorios.');
    }

    if (isNaN(total_ml) || isNaN(remaining_ml) || total_ml <= 0 || remaining_ml < 0) {
      return res.status(400).send('❌ Los valores de ML deben ser números válidos y positivos.');
    }

    const nuevoPerfume = await Perfume.create({
      name,
      total_ml,
      remaining_ml,
      status,
    });
    res.status(201).json(nuevoPerfume);
  } catch (error) {
    console.error('❌ Error al crear perfume:', error);
    res.status(500).send('❌ Error al crear perfume.');
  }
});

// 🧴 Actualizar un perfume
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, total_ml, remaining_ml, status } = req.body;

    if (isNaN(id)) {
      return res.status(400).send('❌ El ID debe ser un número válido.');
    }

    if (!name || !total_ml || !remaining_ml || !status) {
      return res.status(400).send('❌ Todos los campos son obligatorios.');
    }

    if (isNaN(total_ml) || isNaN(remaining_ml) || total_ml <= 0 || remaining_ml < 0) {
      return res.status(400).send('❌ Los valores de ML deben ser números válidos y positivos.');
    }

    const perfume = await Perfume.findByPk(id);

    if (perfume) {
      await perfume.update({ name, total_ml, remaining_ml, status });
      res.status(200).json(perfume);
    } else {
      res.status(404).send('❌ Perfume no encontrado.');
    }
  } catch (error) {
    console.error('❌ Error al actualizar perfume:', error);
    res.status(500).send('❌ Error al actualizar perfume.');
  }
});

// 🧴 Eliminar un perfume
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send('❌ El ID debe ser un número válido.');
    }

    const perfume = await Perfume.findByPk(id);

    if (perfume) {
      await perfume.destroy();
      res.status(204).send(); // No Content
    } else {
      res.status(404).send('❌ Perfume no encontrado.');
    }
  } catch (error) {
    console.error('❌ Error al eliminar perfume:', error);
    res.status(500).send('❌ Error al eliminar perfume.');
  }
});

module.exports = router;