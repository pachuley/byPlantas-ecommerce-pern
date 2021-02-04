const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    encryptedPassword: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ["CLIENT_ROLE", "ADMIN_ROLE", "VENDOR_ROLE"],
      defaultValue: "CLIENT_ROLE",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
