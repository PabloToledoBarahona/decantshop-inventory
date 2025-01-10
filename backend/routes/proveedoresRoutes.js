const express = require('express');
const router = express.Router();
const { Proveedor } = require('../models');

// Crear un proveedor
router.post('/', async (req, res) => {
  try {
    const { nombre, numero_contacto } = req.body;
    if (!nombre || !numero_contacto) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    const nuevoProveedor = await Proveedor.create({ nombre, numero_contacto });
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Obtener todos los proveedores
router.get('/', async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    res.status(200).json(proveedores);
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Obtener un proveedor por ID
router.get('/:id', async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado.' });
    }
    res.status(200).json(proveedor);
  } catch (error) {
    console.error('Error al obtener proveedor:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Actualizar un proveedor
router.put('/:id', async (req, res) => {
  try {
    const { nombre, numero_contacto } = req.body;
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado.' });
    }
    proveedor.nombre = nombre || proveedor.nombre;
    proveedor.numero_contacto = numero_contacto || proveedor.numero_contacto;
    await proveedor.save();
    res.status(200).json(proveedor);
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Eliminar un proveedor
router.delete('/:id', async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado.' });
    }
    await proveedor.destroy();
    res.status(200).json({ message: 'Proveedor eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = router;