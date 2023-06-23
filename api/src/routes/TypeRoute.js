const { Router } = require('express');
const router = Router();
const {Type} = require('../db');
const getType = require('../controllers/getType')

router.get('/', async (req,res)=>{
    try {

        const typesAPI = await getType();
        
        const crearTypes = await Promise.all(typesAPI.map(async(tipo)=>await Type.findOrCreate({where:{name:tipo}})))
        
        const typesDB = crearTypes.map(array=>array[0]) //el primer elemento del array que es lo que cree, ya que el segundo elemento es un booleano que indica que fue creado

        //traemos los type de la api con getType , creamos en la DB los tipos con esa info, hacemos una promiseAll para que se cumpla en el mapeo la creacion de cada uno, usamos find or create asi no se repiten en caso de estar llamando al metodo nuevamente
         res.status(200).json(typesDB);
       
     } catch (error) {
       console.error(error);
       res.status(500).send('Internal server error');
     }
 })
 
 module.exports=router;