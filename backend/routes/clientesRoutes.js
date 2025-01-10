const express = require('express');
const router = express.Router();
const { Cliente } = require('../models');

// Crear un cliente
router.post('/', async (req, res) => {
  try {
    const { nombre_completo, numero_celular, correo } = req.body;
    if (!nombre_completo || !numero_celular) {
      return res.status(400).json({ error: 'Nombre y número celular son obligatorios.' });
    }
    const nuevoCliente = await Cliente.create({ nombre_completo, numero_celular, correo });
    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado.' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
  try {
    const { nombre_completo, numero_celular, correo } = req.body;
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado.' });
    }
    cliente.nombre_completo = nombre_completo || cliente.nombre_completo;
    cliente.numero_celular = numero_celular || cliente.numero_celular;
    cliente.correo = correo || cliente.correo;
    await cliente.save();
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado.' });
    }
    await cliente.destroy();
    res.status(200).json({ message: 'Cliente eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = router;