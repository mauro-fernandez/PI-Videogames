const { DataTypes, DATE } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
      type: DataTypes.STRING, // ver que viene como "released" : "2013-09-17", por ende viene como string y no como date
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
  });
};
