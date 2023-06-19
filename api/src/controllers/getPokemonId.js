const axios = require("axios");
const {Pokemon, Type} = require("../db.js");
const getAll = require("./getAll.js");
const getDb = require("./getDb.js");
//Buscaremos a un pokemon especifico por su ID, primero buscaremos en la base de datos

const getPokemonId = async(id)=>{
    try {
   //con findOne encontramos uno donde coincida el id, lo traemos incluyendo type como atributo

     
      const pokemonDB= await Pokemon.findOne({where:{id},
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
      //en caso de haberlo encontrado lo retornamos, 
      if (pokemonDB) { return pokemonDB
        // En caso que no se encuentre, se busca en la api
     } else {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        //hay que recordar que al recibir los pokemon, los tipos estan dentro de un array de objetos con otros datos que no nos interesan
        //asi que mapeamos para traerlos solo a los nombres de los type
        let tipo = res.data.types.map(e=> {
          return{
            name:e.type.name
          }
        })
        //found pokemon contendra solo los datos que nos interesan para el detail del front
        const foundPokemon = {
            id:res.data.id,
            name: res.data.name,
            hp: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
            speed: res.data.stats[5].base_stat,
            types: tipo,
            weight: res.data.weight,
            height: res.data.height,
            image: res.data.sprites.other["official-artwork"]["front_default"],
          };
     return foundPokemon
     //retornamos el objeto foundPokemon 
    }
    } catch (error) {
        
        console.log(error , "Error en getPokemonId");
    }

}

module.exports=getPokemonId

