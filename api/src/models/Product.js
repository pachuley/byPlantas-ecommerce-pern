const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo
  const Product = sequelize.define('product', {

    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique:true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imgs: {
      type: DataTypes.TEXT,
      // validate:{
      // isUrl:true
      // }
    },
  });
};



