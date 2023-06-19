const axios = require("axios");
const {Pokemon,Type} = require("../db.js")

//aqui vamos a agregar un pokemon a la DB
//recibimos desde el front estos datos del form
const postPokemon = async(name,hp,attack,defense,speed,height,weight,image,typeId)=>{
    if (!name || !hp || !attack || !defense || !image) {
        throw Error ("Faltan datos necesarios!");
      }
      //nos aseguramos de haber recibido los datos requeridos
      try {
        //antes que nada, revisamos que no exista ya un pokemon con este nombre
        const response = await axios.get("http://localhost:3001/pokemons");
      const existeDB = await Pokemon.findOne({where:{name}})
      const existeApi = await response.data.find(e=>e.name===name)
      if( existeApi||existeDB ){throw Error ("Ya existe este pokemon!")}
      //funcion para sumarle al pokemon creado, el ultimo id + 1
      //los pokemon de la api tiene id con un numero entero desde el 1
      //para mantener ese mismo orden numerico, nuestro modelo tiene la propiedad INTEGER asi se continua donde dejo la api
      //para continuar donde dejo la api tenemos que saber cual es el ultimo id, para esto vemos la respuesta de axios y hacemos un sort
      //para asegurarnos que esten ordenados de menor a mayor de acuerdo a su id, con esto obtenemos la length del array de pokemones
      //y con eso sabemos cual va a ser el proximo id, de esta forma cada vez que se sume uno nuevo , se va a sumar 1 al id del ultimo creado

      const ordenID = await response.data.sort((a,b)=>a.id-b.id)
      const highestId= ordenID[ordenID.length - 1].id
      let idbd = highestId + 1;

//organizamos un objeto y le aplicamos el id nuevo, tambien le ponemos Created en True esto va a servir para filtrar los creados en un futuro
      
      const obj= {
        id:idbd,
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        created:true
      } 
 // recibimos los id de los type a agregar, pero en el paso de informacion los recibimos como string, asi que los pasamos a numero 
 //luego creamos el nuevo pokemon en la DB con Create usando la plantilla obj y buscamos en la DB tabla Type todos los type que conincidan con esos
 //id que nos pasaron desde el front
      const idnumber = typeId.map(numero=>Number(numero))
      const newPokemon = await Pokemon.create(obj);
     console.log(newPokemon)
    const dbTypes = await Type.findAll({
      where: {
        id: idnumber
      }
    });
    //le agregamos la relacion en comun con types al pokemon creado y lo retornamos
   await newPokemon.addType(dbTypes)
   console.log(newPokemon)
   return newPokemon
   
      } catch (error) {
        console.log(error,"error en el Post");
      }
    };
    
module.exports=postPokemon

