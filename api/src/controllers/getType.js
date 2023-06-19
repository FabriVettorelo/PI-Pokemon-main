const axios = require("axios");
const {Pokemon,Type} = require("../db.js")
//aqui vamos a traer los tipos de pokemon

const getType= async(req,res)=>{
    //este controller trae los tipos desde la api
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        const types = response.data.results.map(type => type.name);
        //usando axios los traemos y hacemos un mapeo para quedarnos solo con los nombres ya que los otros datos no nos interesan
       return types;
    } catch (error) {
      throw new Error('Error al obtener los Pokemon Type desde la API.');
    }
}

module.exports=getType;

// hay 20 tipos de pokemon en total
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