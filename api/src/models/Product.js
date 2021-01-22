const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo
  const Product = sequelize.define('product', {
    nameProduct: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique:true

    },
    descriptionProduct: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    priceProduct: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stockProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    urlProduct: {
      type: DataTypes.TEXT,
      // validate:{
      //   isUrl:true
      // }
    },
  });
};



