const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("order", {
    status: {
      type: DataTypes.ENUM("active", "processing", "canceled", "complete"),
      defaultValue: "active",
      allowNull: false,
    },
    namereceiver: {
      type: DataTypes.STRING,
      allowNull: true
      
        //como inicial debe llevar false
      },
      lastnamereceiver: {
        type: DataTypes.STRING,
        allowNull: true
        
          //como inicial debe llevar false
        },
        identifier: {
          type: DataTypes.INTEGER,
          allowNull: true
          
            //como inicial debe llevar false
          },
          address: {
            type: DataTypes.STRING,
            allowNull: true
            
              //como inicial debe llevar false
            },
            postalcode: {
              type: DataTypes.INTEGER,
              allowNull: true
              
                //como inicial debe llevar false
              },
              clarification: {
                type: DataTypes.TEXT,
                allowNull: true
                
                  //como inicial debe llevar false
                },
                paymenttype: {
                  type: DataTypes.ENUM("mepago", "tarjeta", "efectivo", "transferencia"),
                  allowNull: true,
                },
  });
};
