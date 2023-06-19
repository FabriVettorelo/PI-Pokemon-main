const { Pokemon, Type } = require('../db.js');

const deletePokemon = async (name) => {
  try {
    const pokemon = await Pokemon.findOne({ where: { name } });
 //recibimos name por query y le pedimos a la DB que encuentre uno donde coincida el nombre
    if (!pokemon) {
      return false; 
    }
    await pokemon.destroy();
//en caso de encontrarlo usamos destroy para eliminarlo
    return true; // eliminado con éxito
  } catch (error) {
    console.log('Error al eliminar el pokemon', error);
    throw error;
  }
};

module.exports = deletePokemon;