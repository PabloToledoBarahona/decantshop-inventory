const express = require('express');
const router = express.Router();
const { Decant, Perfume } = require('../models'); // Importa los modelos
const { Sequelize } = require('sequelize'); // Importar Sequelize para funciones agregadas

// ✅ Obtener todos los decants
router.get('/', async (req, res) => {
  try {
    const decants = await Decant.findAll({
      include: [
        {
          model: Perfume,
          as: 'perfume', // Asegúrate de que este alias coincida en el modelo
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

    res.status(200).json(decants);
  } catch (error) {
    console.error('❌ Error al obtener decants por maleta:', error);
    res.status(500).send('❌ Error al obtener decants por maleta');
  }
});

// ✅ Agregar uno o varios decants
router.post('/', async (req, res) => {
  try {
    const { perfume_id, cantidad, maleta_destino, cantidad_decants = 1 } = req.body;

    // Validaciones de campos obligatorios
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

    // Crear los decants
    const nuevosDecants = [];
    for (let i = 0; i < cantidad_decants; i++) {
      const nuevoDecant = await Decant.create({
        perfume_id,
        cantidad,
        maleta_destino,
      });
      nuevosDecants.push(nuevoDecant);
    }

    // Restar la cantidad total del perfume
    perfume.remaining_ml -= totalMlRequeridos;
    await perfume.save();

    res.status(201).json({
      message: `✅ Se han agregado ${cantidad_decants} decants exitosamente.`,
      decants: nuevosDecants,
    });
  } catch (error) {
    console.error('❌ Error al agregar decants:', error);
    res.status(500).send('❌ Error al agregar decants');
  }
});

// ✅ Eliminar varios decants por IDs específicos
router.delete('/batch', async (req, res) => {
  try {
    const { decant_ids } = req.body;

    console.log('🔍 Parámetros recibidos para eliminar decants:', { decant_ids });

    if (!decant_ids || !Array.isArray(decant_ids) || decant_ids.length === 0) {
      console.warn('⚠️ Parámetros inválidos para eliminación:', { decant_ids });
      return res.status(400).send('❌ Parámetros inválidos. Se espera un array de IDs de decants.');
    }

    // Buscar los decants por ID
    const decants = await Decant.findAll({
      where: { id: decant_ids }
    });

    if (decants.length === 0) {
      console.warn('⚠️ No se encontraron decants para eliminar.');
      return res.status(404).send('❌ No se encontraron decants para eliminar.');
    }

    // Actualizar el stock del perfume y eliminar cada decant
    for (const decant of decants) {
      const perfume = await Perfume.findByPk(decant.perfume_id);
      if (perfume) {
        console.log(`🔄 Actualizando stock del perfume ${perfume.id} (+${decant.cantidad} ml)`);
        perfume.remaining_ml += decant.cantidad;
        await perfume.save();
      } else {
        console.warn(`⚠️ Perfume no encontrado para el decant ${decant.id}`);
      }

      console.log(`🗑️ Eliminando decant ID: ${decant.id}`);
      await decant.destroy();
    }

    console.log('✅ Eliminación de decants completada correctamente.');
    res.status(200).json({ message: `✅ Se eliminaron ${decants.length} decants correctamente.` });
  } catch (error) {
    console.error('❌ Error al eliminar decants en batch:', error.message);
    res.status(500).send('❌ Error interno del servidor.');
  }
});

// ✅ Resumen de Decants
router.get('/resumen', async (req, res) => {
  try {
    const resumen = await Decant.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('cantidad')), 'totalMlDecants'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalDecants'],
      ],
      raw: true,
    });

    const porMaleta = await Decant.findAll({
      attributes: [
        'maleta_destino',
        [Sequelize.fn('SUM', Sequelize.col('cantidad')), 'totalMlPorMaleta'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalDecantsPorMaleta'],
      ],
      group: ['maleta_destino'],
      raw: true,
    });

    res.status(200).json({ resumen, porMaleta });
  } catch (error) {
    console.error('❌ Error al obtener resumen de decants:', error);
    res.status(500).send('❌ Error al obtener resumen de decants');
  }
});

module.exports = router;