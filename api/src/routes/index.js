const { Router } = require('express'); //enrutador que define las rutas
const PokemonsRoute = require('./PokemonRoute');
const TypesRoute = require('./TypeRoute')
// Importar todos los routers;


const router = Router();
// Configuro las rutas para pokemon y types, para que ante cualquier peticion a /pokemons vaya al router de pokemon 

router.use('/pokemons', PokemonsRoute)
router.use('/types', TypesRoute)

module.exports = router;
