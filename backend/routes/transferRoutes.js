const express = require('express');
const router = express.Router();
const { Transfer, Decant, Perfume } = require('../models'); // Importa los modelos
const { Sequelize } = require('sequelize'); // Importar Sequelize para funciones agregadas

// ✅ Asociaciones necesarias
Transfer.belongsTo(Decant, { foreignKey: 'decant_id', as: 'decant' });
Decant.belongsTo(Perfume, { foreignKey: 'perfume_id', as: 'perfume' });

/* ----------------------------------------------- */
/* ✅ Obtener todas las transferencias */
/* ----------------------------------------------- */
router.get('/', async (req, res) => {
  try {
    const transfers = await Transfer.findAll({
      include: [
        {
          model: Decant,
          as: 'decant',
          include: [{ model: Perfume, as: 'perfume' }],
        },
      ],
    });
    res.status(200).json(transfers);
  } catch (error) {
    console.error('❌ Error al obtener transferencias:', error);
    res.status(500).send('❌ Error al obtener transferencias.');
  }
});

/* ----------------------------------------------- */
/* ✅ Agregar nuevas transferencias */
/* ----------------------------------------------- */
router.post('/', async (req, res) => {
  try {
    const { decant_ids, origen, destino, fecha } = req.body;

    if (!decant_ids || !origen || !destino) {
      return res.status(400).send('❌ Todos los campos son obligatorios.');
    }

    const maletasPermitidas = ['Pablo', 'Jose Carlos'];
    if (!maletasPermitidas.includes(origen) || !maletasPermitidas.includes(destino)) {
      return res.status(400).send('❌ Maleta no válida. Use "Pablo" o "Jose Carlos".');
    }

    if (origen === destino) {
      return res.status(400).send('❌ El origen y destino no pueden ser iguales.');
    }

    const transferenciasCreadas = [];
    for (const decant_id of decant_ids) {
      const decant = await Decant.findByPk(decant_id);
      if (!decant) {
        return res.status(404).send(`❌ Decant con ID ${decant_id} no encontrado.`);
      }

      if (decant.maleta_destino !== origen) {
        return res
          .status(400)
          .send(`❌ El decant con ID ${decant_id} no está en la maleta de origen especificada.`);
      }

      const nuevaTransferencia = await Transfer.create({
        decant_id,
        origen,
        destino,
        fecha: fecha || new Date(),
      });

      decant.maleta_destino = destino;
      await decant.save();

      transferenciasCreadas.push(nuevaTransferencia);
    }

    res.status(201).json(transferenciasCreadas);
  } catch (error) {
    console.error('❌ Error al agregar transferencia:', error);
    res.status(500).send('❌ Error al agregar transferencia.');
  }
});

/* ----------------------------------------------- */
/* ✅ Obtener historial de transferencias de un Decant */
/* ----------------------------------------------- */
router.get('/decant/:decant_id', async (req, res) => {
  try {
    const { decant_id } = req.params;

    if (isNaN(decant_id)) {
      return res.status(400).send('❌ El ID del decant debe ser un número válido.');
    }

    const transfers = await Transfer.findAll({
      where: { decant_id },
      include: [
        {
          model: Decant,
          as: 'decant',
          include: [{ model: Perfume, as: 'perfume' }],
        },
      ],
    });

    if (!transfers.length) {
      return res.status(404).send('❌ No se encontraron transferencias para este decant.');
    }

    res.status(200).json(transfers);
  } catch (error) {
    console.error('❌ Error al obtener historial de transferencias:', error);
    res.status(500).send('❌ Error al obtener historial de transferencias.');
  }
});

/* ----------------------------------------------- */
/* ✅ Obtener detalles de una transferencia específica */
/* ----------------------------------------------- */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send('❌ El ID debe ser un número válido.');
    }

    const transfer = await Transfer.findByPk(id, {
      include: [
        {
          model: Decant,
          as: 'decant',
          include: [{ model: Perfume, as: 'perfume' }],
        },
      ],
    });

    if (!transfer) {
      return res.status(404).send('❌ Transferencia no encontrada.');
    }

    res.status(200).json(transfer);
  } catch (error) {
    console.error('❌ Error al obtener detalles de la transferencia:', error);
    res.status(500).send('❌ Error al obtener detalles de la transferencia.');
  }
});

/* ----------------------------------------------- */
/* ✅ Eliminar una transferencia */
/* ----------------------------------------------- */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send('❌ El ID debe ser un número válido.');
    }

    const transfer = await Transfer.findByPk(id);
    if (!transfer) {
      return res.status(404).send('❌ Transferencia no encontrada.');
    }

    await transfer.destroy();
    res.status(204).send(); // No Content
  } catch (error) {
    console.error('❌ Error al eliminar transferencia:', error);
    res.status(500).send('❌ Error al eliminar transferencia.');
  }
});

/* ----------------------------------------------- */
/* ✅ Obtener estadísticas de transferencias */
/* ----------------------------------------------- */
router.get('/stats', async (req, res) => {
  try {
    const totalTransfers = await Transfer.count();
    const fromPablo = await Transfer.count({ where: { origen: 'Pablo' } });
    const fromJoseCarlos = await Transfer.count({ where: { origen: 'Jose Carlos' } });
    const lastTransfer = await Transfer.findOne({ order: [['fecha', 'DESC']] });

    const stats = {
      totalTransfers,
      fromPablo,
      fromJoseCarlos,
      lastTransferDate: lastTransfer ? lastTransfer.fecha : null,
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('❌ Error al obtener estadísticas de transferencias:', error);
    res.status(500).send('❌ Error al obtener estadísticas de transferencias.');
  }
});

module.exports = router;