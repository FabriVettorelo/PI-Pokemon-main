const axios = require("axios");
const {Pokemon,Type} = require("../db")
const getType = require("./getType")
//en este controlador obtenemos los pokemon de la base de datos


const getDb = async () => {
//Antes de acceder a los datos de la base de datos, vamos a crear los valores de la tabla types
//estos valores son los 20 tipos de pokemon, en base a esto los nuevos pokemon creados por
//el usuario van a poder escoger entre uno de esos tipos ya existentes
//utilizamos find or create para que no se repitan los type en caso de que ya se hayan añadidos
// con getType accedemos a type en la api, esto nos muestra una lista de todos los tipos

const typesAPI = await getType();

//mapeamos quedandonos unicamente con el nombre de cada tipo
// ahora creamos en la tabla type tomando el array recien creado como referencia

const crearTypes = await Promise.all(typesAPI.map(async(tipo)=>await Type.findOrCreate({where:{name:tipo}})))

const typesDB = crearTypes.map(array=>array[0])
try {
    //ahora si vamos a acceder a todos los pokemon de la base de datos, para esto 
    //usamos findAll e incluimos el type como un atributo, por que los type estan guardados aparte en su propia tabla
    const database= await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
    return database
} catch (error) {
    console.log(error,"Error DB al obtener todos los pokemon y sus type")
}
};

module.exports= getDb