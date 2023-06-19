const { DataTypes } = require('sequelize');
//Ahora realizo el mismo procedimiento para el modelo Type
module.exports = (sequelize) => {
  sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER, //cada type tendra un ID, no es realmente necesario ya que puede darsele un nombre unico y ser identificado por el nombre, pero es uno de los requisitos del Readme y lo seguiremos
      autoIncrement:true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{
    timestamps: false
  });
};

//estos son los id de cada tipo de pokemon:
// name      #id

// normal    #1
// fighting  #2
// flying    #3
// poison    #4
// ground    #5
// rock      #6
// bug       #7
// ghost     #8
// steel     #9
// fire      #10 
// water     #11
// grass     #12
// electric  #13
// psychic   #14
// ice       #15
// dragon    #16
// dark      #17
// fairy     #18
//unknown    #10001
//shadow     #10002