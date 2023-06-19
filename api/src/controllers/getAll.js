const axios = require("axios");
const {Pokemon,Type} = require("../db.js")
const getPokemons = require("./getPokemons.js")
const getDb = require("./getDb.js")


//en este controlador vamos a concatenar la informacion de la api con la de la base de datos
//y devolver la informacion toda junta
const getAll = async () => {

//traemos la info de la api y la de la database, y concatenamos todo dentro del mismo array para devolver un solo paquete de informacion
 
    const apiData = await getPokemons();
    const dbInfo = await getDb();
    console.log(dbInfo)
    const allInfo =apiData.concat(dbInfo)
    return allInfo;
};

module.exports = getAll