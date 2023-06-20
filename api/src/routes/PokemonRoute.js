const { Router } = require('express');
const axios =require ('axios');
const router = Router();
const {Pokemon, Type} = require('../db')
const getAll = require('../controllers/getAll');
const getPokemonId = require('../controllers/getPokemonId')
const postPokemon = require('../controllers/postPokemon');
const deletePokemon = require('../controllers/deletePokemon')

//Traer a todos los pokemon
router.get('/', async (req, res) => {
  try {
    const name = req.query.name;
    //con el controller getAll traemos todos los pokemon de la DB y de la Api
    let pokeTotal = await getAll();
    
    if(!name){
      //si no hay ningun name ingresado, devolvemos el total de todos, ya que significa que no se busco nada
      return res.status(200).json(pokeTotal);}
      
  if (name){
      //si name si se busco, filtra el total de pokemons por el objeto "name"

      //esta opcion es para buscar con valores similares que incluyan lo escrito en name, de esta forma con tipear "pik" ya recibimos "pikachu"
        // let pokeNames = pokeTotal.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));

      //esta otra forma es la que pedia el readme con el nombre exacto  
        let pokeNames = pokeTotal.filter((e) => e.name.toLowerCase()===name.toLowerCase())
        return res.status(200).json(pokeNames);}

  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
})

  //Buscar Pokemons por id
  router.get('/:id', async (req, res) => {
    try {
      //recibimos id por params y mediante el controller getPokemonId lo buscamos con axios, si no se encuentra recibimos un 404
      const pokemonId = req.params.id;
      const pokemon = await getPokemonId(pokemonId);
      if(!pokemon){
        return res.status(404).send('Pokemon no encontrado');
      }
      res.status(200).send(pokemon)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al buscar el Pokemon' });
    }
  });

  //crear pokemon
  router.post('/', async (req, res) => {
    try {
    //estos son los datos que vamos a recibir en el body
      const {name, hp, attack, defense, speed, height, weight, image,typeId} = req.body;
    //se los pasamos directamente al controller postPokemon que se encargara de guardar todo en la DB
      const pokemon = await postPokemon(name, hp, attack, defense, speed, height, weight, image,typeId)
  
      if (!pokemon) {
        return res.status(400).json({ message: "Not created" });
      }
  
      return res.status(201).json(pokemon);
    } catch (error) {
      console.error(error.message);
      return res.status(404).send("Error en alguno de los datos enviados");
    }
  });

  router.delete("/", async (req,res)=>{
    const {name} = req.query
    try {
       //en este caso para eliminar un pokemon de la DB vamos a recibir el name de aquel pokemon a borrar, y el controlador delete se encargara
        const deletedPokemon= await deletePokemon(name)

        if(deletedPokemon) {return res.status(200).json({message:`El pokemon ${name} se elimino con exito`});}
        else{return res.status(404).json({message:`El pokemon ${name} no se encontro`});}
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({message:"error al eliminar el pokemon"})
    }
  })
module.exports = router;








//   router.put("/:id", async (req,res)=>{
//     try {
//      const pokemonId= req.params.id

//     const upPokemon= await Pokemon.update({
//      name: "",

//  }, {
//      where: {
//          pokemonId: pokemonId,
//          name: "",
//      }
//  });
//     if(upPokemon===0){
//      res.status(400).send("error al encontrar el pokemon")
//     }
//     return res.status(200).send(`El pokemon ${pokemonId} se actualizó con exito`)
//     } catch (error) {
//      console.error(error)
//      return res.status(400).send("internal server error")
//     }
//  })

  