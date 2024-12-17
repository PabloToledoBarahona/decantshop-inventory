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

    // Validar campos obligatorios
    if (!decant_id || !origen || !destino) {
      return res.status(400).send('Todos los campos (decant_id, origen, destino) son obligatorios.');
    }

    // Validar que origen y destino sean valores válidos
    const maletasPermitidas = ['Pablo', 'Jose Carlos'];
    if (!maletasPermitidas.includes(origen) || !maletasPermitidas.includes(destino)) {
      return res.status(400).send('Maleta origen o destino no válida. Use "Pablo" o "Jose Carlos".');
    }

    // Validar que origen y destino no sean iguales
    if (origen === destino) {
      return res.status(400).send('La maleta de origen y destino no pueden ser iguales.');
    }

    // Verificar si el decant existe
    const decant = await Decant.findByPk(decant_id);
    if (!decant) {
      return res.status(404).send('Decant no encontrado.');
    }

    // Verificar que el decant esté actualmente en la maleta de origen
    if (decant.maleta_destino !== origen) {
      return res.status(400).send('El decant no está en la maleta de origen especificada.');
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
    res.status(500).send('Error al agregar transferencia.');
  }
});

// Obtener el historial de transferencias de un decant
router.get('/transfers/decant/:decant_id', async (req, res) => {
  try {
    const { decant_id } = req.params;

    // Validar que el decant_id sea un número válido
    if (isNaN(decant_id)) {
      return res.status(400).send('El ID del decant debe ser un número válido.');
    }

    // Buscar el historial de transferencias
    const transfers = await Transfer.findAll({
      where: { decant_id },
    });

    if (transfers.length === 0) {
      return res.status(404).send('No se encontraron transferencias para este decant.');
    }

    res.status(200).json(transfers);
  } catch (error) {
    console.error('Error al obtener historial de transferencias:', error);
    res.status(500).send('Error al obtener historial de transferencias.');
  }
});

module.exports = router;