const express = require('express');
const router = express.Router();
const { Vendedor } = require('../models');

// Crear un vendedor
router.post('/', async (req, res) => {
  try {
    const { nombre_completo, numero_celular, correo } = req.body;
    if (!nombre_completo || !numero_celular) {
      return res
        .status(400)
        .json({ error: 'Nombre completo y número celular son obligatorios.' });
    }
    const nuevoVendedor = await Vendedor.create({ nombre_completo, numero_celular, correo });
    res.status(201).json(nuevoVendedor);
  } catch (error) {
    console.error('Error al crear vendedor:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Obtener todos los vendedores
router.get('/', async (req, res) => {
  try {
    const vendedores = await Vendedor.findAll();
    res.status(200).json(vendedores);
  } catch (error) {
    console.error('Error al obtener vendedores:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Obtener un vendedor por ID
router.get('/:id', async (req, res) => {
  try {
    const vendedor = await Vendedor.findByPk(req.params.id);
    if (!vendedor) {
      return res.status(404).json({ error: 'Vendedor no encontrado.' });
    }
    res.status(200).json(vendedor);
  } catch (error) {
    console.error('Error al obtener vendedor:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Actualizar un vendedor
router.put('/:id', async (req, res) => {
  try {
    const { nombre_completo, numero_celular, correo } = req.body;
    const vendedor = await Vendedor.findByPk(req.params.id);
    if (!vendedor) {
      return res.status(404).json({ error: 'Vendedor no encontrado.' });
    }
    vendedor.nombre_completo = nombre_completo || vendedor.nombre_completo;
    vendedor.numero_celular = numero_celular || vendedor.numero_celular;
    vendedor.correo = correo || vendedor.correo;
    await vendedor.save();
    res.status(200).json(vendedor);
  } catch (error) {
    console.error('Error al actualizar vendedor:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Eliminar un vendedor
router.delete('/:id', async (req, res) => {
  try {
    const vendedor = await Vendedor.findByPk(req.params.id);
    if (!vendedor) {
      return res.status(404).json({ error: 'Vendedor no encontrado.' });
    }
    await vendedor.destroy();
    res.status(200).json({ message: 'Vendedor eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar vendedor:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = router;