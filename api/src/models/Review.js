'use strict'
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  // defino el modelo
  const Review = sequelize.define('Review', {

    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },{
    tableName: 'review',
  });
};

