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
  });
};
