const { DataTypes } = require('sequelize');
// Exporto directamente una funcion que define el modelo
// Luego le hago la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo con todas las propiedades que busco presentar.
  sequelize.define('pokemon', {
    id: {
      type:DataTypes.INTEGER, //voy a continuar los id numerados desde el 1 que ya vienen de la api, asi que utilizare INTEGER por que son numeros enteros 
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
      type:DataTypes.BOOLEAN,  //aqui vamos a marcar que es un pokemon creado, esto nos servira mas tarde para filtrar los creados de los originales
      defaultValue:false
    }
  },{
    timestamps: false
  });
};

// otra opcion para ID era el UUID valor universal unico pero trae el problema de que cuando se quiere acceder por ID toma el valor incorrecto
// ejemplo: pokemons/353sdfs1231dsfa   ----> en vez de tomar todo el valor toma los primeros numeros 353 y devuelve el pokemon 353 de la api
// para evitar este problema y mantener el orden que ya viene de la api utilizo enteros y descarto utilizar UUID, que se veria de la siguiente forma
// id: {
//   type: DataTypes.UUID,
//   primaryKey: true,
//   defaultValue: DataTypes.UUIDV4,
// }