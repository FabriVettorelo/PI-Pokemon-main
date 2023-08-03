const axios = require("axios");
const {Pokemon,Type} = require("../db.js")

//vamos a traer a todos los pokemon que estan en la api

const getPokemons = async()=>{
    //utilizo un limite de 60 para trabajar mas rapidamente, pero funciona igual de bien trayendo los 1281 que hay en total 
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=250');
      //traemos el gran objeto desde la api, dentro de results tenemos un array con todos los pokemons
      const pokemons = response.data.results;
      //la constante pokemons data va a tener mapeado dentro todos los pokemones del array results
      //mediante promise.all nos aseguramos de traer completa toda la informacion que buscamos (array de promesas)
      const pokemonsData = await Promise.all(pokemons.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);           // cada res va a ser una peticion por axios a los datos de la api
        let tipo = res.data.types.map(e=> {       //en el caso de type, como este es un array se le realiza un mapeo donde se saca el nombre de cada tipo
          return{           //de pokemon, un pokemon puede ser de mas de un tipo por lo cual juntamos el resultado con un .join
            name:e.type.name
          }
        })
    return {
          id:res.data.id,
          name: res.data.name,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
          weight: res.data.weight,
          height: res.data.height,
          types: tipo,
          image: res.data.sprites.other.home["front_default"]? res.data.sprites.other.home["front_default"] :  " https://as01.epimg.net/epik/imagenes/2018/11/16/portada/1542384053_864693_1542384302_noticia_normal.jpg"
          };
      }));
      //res.data.types.map(e=>e.type.name).join(", ")
      //las imagenes se encuentran dentro de la carpeta de sprites, los sprites son el arte utilizado para 
      //representar a los personajes dentro de un videojuego, por lo tanto para obtener algo no pixelado y de 
      //mejor calidad, nos vamos a la propiedad other donde hay arte oficial del pokemon, presentaremos esa img
      return pokemonsData;
    } catch (error) {
      console.log("Error al obtener los datos",error);
    }
}
    
module.exports= getPokemons;

   