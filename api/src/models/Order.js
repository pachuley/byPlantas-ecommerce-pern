const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    
    date: {
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('cart', 'created', 'processing', 'canceled', 'complete'),
        defaultValue:"cart",
        allowNull: false
      },
  });
};