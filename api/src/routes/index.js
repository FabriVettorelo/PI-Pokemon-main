const { Router } = require('express');
const PokemonsRoute = require('./PokemonRoute');
const TypesRoute = require('./typeRoute')
// Importar todos los routers;


const router = Router();
// Configuro los routers

router.use('/pokemons', PokemonsRoute)
router.use('/types', TypesRoute)

module.exports = router;
