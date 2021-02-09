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
      
    }, 
    
    quantity: {
      type: DataTypes.INTEGER,
      
      },
    discount: {
      type: DataTypes.INTEGER,
      
      },
    total: {
      type: DataTypes.DECIMAL,
      
        //como inicial debe llevar false
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