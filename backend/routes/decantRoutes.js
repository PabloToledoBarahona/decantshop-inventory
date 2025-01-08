const express = require('express');
const router = express.Router();
const { Decant, Perfume } = require('../models'); // Importa los modelos
const { Sequelize } = require('sequelize'); // Importar Sequelize para funciones agregadas

// ✅ Obtener todos los decants (sin paginación)
router.get('/', async (req, res) => {
  try {
    const decants = await Decant.findAll({
      include: [
        {
          model: Perfume,
          as: 'perfume',
        },
      ],
    });

    res.status(200).json(decants);
  } catch (error) {
    console.error('❌ Error al obtener decants:', error);
    res.status(500).send('❌ Error al obtener decants');
  }
});

// ✅ Obtener Decants por Maleta
router.get('/maleta/:maleta_destino', async (req, res) => {
  try {
    const { maleta_destino } = req.params;

    const maletasPermitidas = ['Pablo', 'Jose Carlos'];
    if (!maletasPermitidas.includes(maleta_destino)) {
      return res.status(400).send('❌ Maleta destino no válida. Use "Pablo" o "Jose Carlos".');
    }

    const decants = await Decant.findAll({
      where: { maleta_destino },
      include: [
        {
          model: Perfume,
          as: 'perfume',
        },
      ],
    });

    const totalDecants = await Decant.count({ where: { maleta_destino } });
    const totalMl = await Decant.sum('cantidad', { where: { maleta_destino } });

    res.status(200).json({
      decants,
      resumen: {
        totalDecants,
        totalMl,
      },
    });
  } catch (error) {
    console.error('❌ Error al obtener decants por maleta:', error);
    res.status(500).send('❌ Error al obtener decants por maleta');
  }
});

// ✅ Agregar uno o varios decants
router.post('/', async (req, res) => {
  try {
    const { perfume_id, cantidad, maleta_destino, cantidad_decants = 1 } = req.body;

    if (!perfume_id || !cantidad || !maleta_destino) {
      return res.status(400).send('❌ Todos los campos son obligatorios.');
    }

    if (cantidad <= 0 || cantidad_decants <= 0) {
      return res.status(400).send('❌ La cantidad y cantidad_decants deben ser números positivos.');
    }

    const maletasPermitidas = ['Pablo', 'Jose Carlos'];
    if (!maletasPermitidas.includes(maleta_destino)) {
      return res.status(400).send('❌ Maleta destino no válida. Use "Pablo" o "Jose Carlos".');
    }

    const perfume = await Perfume.findByPk(perfume_id);
    if (!perfume) {
      return res.status(404).send('❌ Perfume no encontrado.');
    }

    const totalMlRequeridos = cantidad * cantidad_decants;
    if (perfume.remaining_ml < totalMlRequeridos) {
      return res.status(400).send('❌ No hay suficiente cantidad disponible para todos los decants.');
    }

    const nuevosDecants = [];
    for (let i = 0; i < cantidad_decants; i++) {
      const nuevoDecant = await Decant.create({
        perfume_id,
        cantidad,
        maleta_destino,
      });
      nuevosDecants.push(nuevoDecant);
    }

    perfume.remaining_ml -= totalMlRequeridos;
    await perfume.save();

    res.status(201).json({
      message: `✅ Se han agregado ${cantidad_decants} decants exitosamente.`,
      decants: nuevosDecants,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('❌ Error al agregar decants:', error);
    res.status(500).send('❌ Error al agregar decants');
  }
});

// ✅ Eliminar un decant individual por ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).send('❌ El ID del decant no es válido.');
    }

    const decant = await Decant.findByPk(id);

    if (!decant) {
      return res.status(404).send('❌ Decant no encontrado.');
    }

    const perfume = await Perfume.findByPk(decant.perfume_id);
    if (perfume) {
      perfume.remaining_ml += decant.cantidad;
      await perfume.save();
    }

    await decant.destroy();

    res.status(200).json({ message: `✅ Decant ID ${id} eliminado correctamente.` });
  } catch (error) {
    console.error('❌ Error al eliminar decant:', error);
    res.status(500).send('❌ Error interno del servidor.');
  }
});

// ✅ Eliminar varios decants por IDs específicos
router.delete('/batch', async (req, res) => {
  try {
    const { decant_ids } = req.body;

    if (!decant_ids || !Array.isArray(decant_ids) || decant_ids.length === 0) {
      return res.status(400).send('❌ Parámetros inválidos. Se espera un array de IDs de decants.');
    }

    const decants = await Decant.findAll({
      where: { id: decant_ids },
    });

    if (decants.length === 0) {
      return res.status(404).send('❌ No se encontraron decants para eliminar.');
    }

    for (const decant of decants) {
      const perfume = await Perfume.findByPk(decant.perfume_id);
      if (perfume) {
        perfume.remaining_ml += decant.cantidad;
        await perfume.save();
      }
      await decant.destroy();
    }

    res.status(200).json({
      message: `✅ Se eliminaron ${decants.length} decants correctamente.`,
      deletedIds: decant_ids,
    });
  } catch (error) {
    console.error('❌ Error al eliminar decants en batch:', error.message);
    res.status(500).send('❌ Error interno del servidor.');
  }
});

// ✅ Resumen de Decants
router.get('/resumen', async (req, res) => {
  try {
    const { maleta_destino } = req.query;
    const whereClause = maleta_destino ? { maleta_destino } : {};

    const resumen = await Decant.findAll({
      where: whereClause,
      attributes: [
        'maleta_destino',
        [Sequelize.fn('SUM', Sequelize.col('cantidad')), 'totalMlDecants'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalDecants'],
      ],
      group: ['maleta_destino'],
      raw: true,
    });

    res.status(200).json(resumen);
  } catch (error) {
    console.error('❌ Error al obtener resumen de decants:', error);
    res.status(500).send('❌ Error al obtener resumen de decants');
  }
});

module.exports = router;