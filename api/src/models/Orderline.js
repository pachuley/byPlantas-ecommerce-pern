const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo

// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('orderline', {
    productId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'products', // 'Movies' would also work
        key: 'id'
      }
    },
    orderId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'products', // 'Movies' would also work
        key: 'id'
      }
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
        //como inicial debe llevar false
      },
      





  });
};