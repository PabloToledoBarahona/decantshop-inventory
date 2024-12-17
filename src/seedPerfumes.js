const db = require('./models'); // Importar modelos y conexión Sequelize
const Perfume = require('./models').Perfume;

const perfumes = [
  { name: "Carolina Herrera 212 MEN EDT", total_ml: 200, remaining_ml: 200, status: "Disponible" },
  { name: "Bleu de Chanel EDP", total_ml: 150, remaining_ml: 150, status: "Disponible" },
  { name: "Allure Homme Sport EDP", total_ml: 150, remaining_ml: 150, status: "Disponible" },
  { name: "Sauvage EDT", total_ml: 300, remaining_ml: 300, status: "Disponible" },
  { name: "Fahrenheit EDT", total_ml: 200, remaining_ml: 200, status: "Disponible" },
  { name: "Dior Homme Sport EDT", total_ml: 125, remaining_ml: 125, status: "Disponible" },
  { name: "Dolce & Gabbana Light Blue pour homme Eau Intense EDP", total_ml: 200, remaining_ml: 200, status: "Disponible" },
  { name: "Aqua di Gio Profondo EDP", total_ml: 200, remaining_ml: 200, status: "Disponible" },
  { name: "Stronger With You EDT", total_ml: 100, remaining_ml: 100, status: "Disponible" },
  { name: "Stronger with you intensely", total_ml: 100, remaining_ml: 100, status: "Disponible" },
  { name: "Givenchy Gentleman EDT intense", total_ml: 100, remaining_ml: 100, status: "Disponible" },
  { name: "JPG le male le parfum", total_ml: 200, remaining_ml: 200, status: "Disponible" },
  { name: "JPG le male elixir", total_ml: 125, remaining_ml: 125, status: "Disponible" },
  { name: "JPG Scandal Absolu", total_ml: 150, remaining_ml: 150, status: "Disponible" },
  { name: "Monclear Pour Homme EDP", total_ml: 100, remaining_ml: 100, status: "Disponible" },
  { name: "MontBlanc Explorer EDP", total_ml: 200, remaining_ml: 200, status: "Disponible" },
  { name: "Moschino Toy Boy EDP", total_ml: 100, remaining_ml: 100, status: "Disponible" },
  { name: "Paco Rabanne Invictus EDT", total_ml: 200, remaining_ml: 200, status: "Disponible" },
  { name: "Invictus Parfum", total_ml: 200, remaining_ml: 200, status: "Disponible" },
  { name: "Phantom Legion EDT", total_ml: 100, remaining_ml: 100, status: "Disponible" },
  { name: "One Million EDT", total_ml: 200, remaining_ml: 200, status: "Disponible" },
  { name: "Polo Sport EDT", total_ml: 100, remaining_ml: 100, status: "Disponible" },
  { name: "Polo Blue EDT", total_ml: 200, remaining_ml: 200, status: "Disponible" },
  { name: "Tom Ford Ombre Leather EDP", total_ml: 100, remaining_ml: 100, status: "Disponible" },
  { name: "Valentino Uomo Born In Roma Intense EDP", total_ml: 100, remaining_ml: 100, status: "Disponible" },
  { name: "Versace Eros EDT", total_ml: 200, remaining_ml: 200, status: "Disponible" },
  { name: "Versace Eros Parfum", total_ml: 100, remaining_ml: 100, status: "Disponible" },
  { name: "Versace Dylan Blue EDT", total_ml: 200, remaining_ml: 200, status: "Disponible" },
  { name: "Versace Eros Flame EDP", total_ml: 200, remaining_ml: 200, status: "Disponible" },
  { name: "Viktor & Rolf SpiceBomb Dark Leather EDP", total_ml: 90, remaining_ml: 90, status: "Disponible" },
  { name: "YSL Y EDP", total_ml: 200, remaining_ml: 200, status: "Disponible" }
];

const seedPerfumes = async () => {
  try {
    await db.sequelize.sync(); // Asegurarse de que la DB esté sincronizada
    await Perfume.bulkCreate(perfumes); // Inserta el listado
    console.log('¡Perfumes insertados correctamente!');
    process.exit();
  } catch (error) {
    console.error('Error al insertar perfumes:', error);
    process.exit(1);
  }
};

seedPerfumes();