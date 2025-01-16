const express = require('express');
const router = express.Router();
const { Venta, Cliente, Decant, VentasDecants } = require('../models');

// Crear una venta
router.post('/', async (req, res) => {
  const { cliente_id, fecha, monto_total, estado, detalles, decants } = req.body;

  try {
    // Verificar si el cliente existe
    const cliente = await Cliente.findByPk(cliente_id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Crear la venta
    const nuevaVenta = await Venta.create({ cliente_id, fecha, monto_total, estado, detalles });

    // Asociar decants a la venta
    if (decants && decants.length > 0) {
      for (const decant of decants) {
        const { decant_id, cantidad, precio_unitario } = decant;

        // Validar existencia y cantidad disponible del decant
        const decantData = await Decant.findByPk(decant_id);
        if (!decantData || decantData.cantidad < cantidad) {
          return res.status(400).json({ error: `Stock insuficiente para el decant con ID ${decant_id}` });
        }

        // Registrar la relación en VentasDecants
        await VentasDecants.create({
          venta_id: nuevaVenta.id,
          decant_id,
          cantidad,
          precio_unitario,
        });

        // Actualizar la cantidad de decants
        decantData.cantidad -= cantidad;
        await decantData.save();
      }
    }

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
      include: [
        {
          model: Cliente,
          as: 'cliente',
          attributes: ['id', 'nombre_completo', 'numero_celular', 'correo'],
        },
        {
          model: Decant,
          as: 'decants',
          attributes: ['id', 'perfume_id', 'cantidad', 'maleta_destino'],
          through: {
            attributes: ['cantidad', 'precio_unitario'], // Atributos de la tabla intermedia
          },
        },
      ],
    });
    res.status(200).json(ventas);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// obtener venta por id
router.get('/:id', async (req, res) => {
    try {
      const venta = await Venta.findByPk(req.params.id, {
        include: [
          {
            model: Cliente,
            as: 'cliente',
            attributes: ['id', 'nombre_completo', 'numero_celular', 'correo'],
          },
          {
            model: Decant,
            as: 'decants',
            attributes: ['id', 'perfume_id', 'cantidad', 'maleta_destino'],
            through: {
              attributes: ['cantidad', 'precio_unitario'], // Incluye los atributos de la tabla intermedia
            },
          },
        ],
      });
  
      if (!venta) {
        return res.status(404).json({ error: 'Venta no encontrada.' });
      }
  
      res.status(200).json(venta);
    } catch (error) {
      console.error('Error al obtener venta por ID:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });


  // Actualizar pagos y estado de una venta
  router.put('/:id', async (req, res) => {
    try {
      const { monto_pagado } = req.body;
      const venta = await Venta.findByPk(req.params.id);
  
      if (!venta) {
        return res.status(404).json({ error: 'Venta no encontrada.' });
      }
  
      if (monto_pagado < 0 || monto_pagado > venta.monto_total) {
        return res.status(400).json({ error: 'El monto pagado no es válido.' });
      }
  
      venta.monto_pagado = monto_pagado;
      await venta.save(); // El hook actualizará el saldo y el estado automáticamente
  
      res.status(200).json(venta);
    } catch (error) {
      console.error('Error al actualizar venta:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });


  //eliminar una venta
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

