const express = require('express');
const router = express.Router();
const { Venta, Cliente } = require('../models');

// Crear una venta
router.post('/', async (req, res) => {
    try {
      const { cliente_id, vendedor_id, fecha, monto_total, estado, detalles } = req.body;
  
      // Validar que el cliente y el vendedor existan
      const cliente = await Cliente.findByPk(cliente_id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado.' });
      }
  
      const vendedor = await Vendedor.findByPk(vendedor_id);
      if (!vendedor) {
        return res.status(404).json({ error: 'Vendedor no encontrado.' });
      }
  
      // Crear la venta
      const nuevaVenta = await Venta.create({ cliente_id, vendedor_id, fecha, monto_total, estado, detalles });
      res.status(201).json(nuevaVenta);
    } catch (error) {
      console.error('Error al crear venta:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });

// Obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: {
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nombre_completo', 'numero_celular', 'correo'],
      },
    });
    res.status(200).json(ventas);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Obtener una venta por ID
router.get('/:id', async (req, res) => {
  try {
    const venta = await Venta.findByPk(req.params.id, {
      include: {
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nombre_completo', 'numero_celular', 'correo'],
      },
    });
    if (!venta) {
      return res.status(404).json({ error: 'Venta no encontrada.' });
    }
    res.status(200).json(venta);
  } catch (error) {
    console.error('Error al obtener venta:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Actualizar una venta
router.put('/:id', async (req, res) => {
  try {
    const { cliente_id, fecha, monto_total, estado, detalles } = req.body;
    const venta = await Venta.findByPk(req.params.id);
    if (!venta) {
      return res.status(404).json({ error: 'Venta no encontrada.' });
    }

    // Validar cliente_id si se proporciona
    if (cliente_id) {
      const cliente = await Cliente.findByPk(cliente_id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado.' });
      }
    }

    // Actualizar los campos
    venta.cliente_id = cliente_id || venta.cliente_id;
    venta.fecha = fecha || venta.fecha;
    venta.monto_total = monto_total || venta.monto_total;
    venta.estado = estado || venta.estado;
    venta.detalles = detalles || venta.detalles;

    await venta.save();
    res.status(200).json(venta);
  } catch (error) {
    console.error('Error al actualizar venta:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Eliminar una venta
router.delete('/:id', async (req, res) => {
  try {
    const venta = await Venta.findByPk(req.params.id);
    if (!venta) {
      return res.status(404).json({ error: 'Venta no encontrada.' });
    }

    await venta.destroy();
    res.status(200).json({ message: 'Venta eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar venta:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = router;