const express = require('express');
const router = express.Router();
const { Transfer, Decant } = require('../models'); // Importa los modelos

// Obtener todas las transferencias
router.get('/transfers', async (req, res) => {
  try {
    const transfers = await Transfer.findAll();
    res.status(200).json(transfers);
  } catch (error) {
    console.error('Error al obtener transferencias:', error);
    res.status(500).send('Error al obtener transferencias');
  }
});

// Agregar una nueva transferencia
router.post('/transfers', async (req, res) => {
  try {
    const { decant_id, origen, destino, fecha } = req.body;

    // Verificar si el decant existe
    const decant = await Decant.findByPk(decant_id);
    if (!decant) {
      return res.status(404).send('Decant no encontrado');
    }

    // Crear la transferencia
    const nuevaTransferencia = await Transfer.create({
      decant_id,
      origen,
      destino,
      fecha: fecha || new Date(), // Si no se envía fecha, usar la fecha actual
    });

    // Actualizar la maleta de destino en el decant
    decant.maleta_destino = destino;
    await decant.save();

    res.status(201).json(nuevaTransferencia);
  } catch (error) {
    console.error('Error al agregar transferencia:', error);
    res.status(500).send('Error al agregar transferencia');
  }
});

// Obtener el historial de transferencias de un decant
router.get('/transfers/decant/:decant_id', async (req, res) => {
  try {
    const { decant_id } = req.params;

    const transfers = await Transfer.findAll({
      where: { decant_id },
    });

    res.status(200).json(transfers);
  } catch (error) {
    console.error('Error al obtener historial de transferencias:', error);
    res.status(500).send('Error al obtener historial de transferencias');
  }
});

module.exports = router;