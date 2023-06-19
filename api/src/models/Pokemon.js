const { DataTypes } = require('sequelize');
// Exporto directamente una funcion que define el modelo
// Luego le hago la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo con todas las propiedades que busco presentar.
  sequelize.define('pokemon', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hp:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 0
    },
    attack:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    defense:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    speed:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    height:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    weight:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    created:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  },{
    timestamps: false
  });
};

// id: {
//   type: DataTypes.UUID,
//   primaryKey: true,
//   defaultValue: DataTypes.UUIDV4,
// }