const { Router } = require('express');
const router = Router();
const {Type} = require('../db');
const getType = require('../controllers/getType')

router.get('/', async (req,res)=>{
    try {

        const typesAPI = await getType();

        const crearTypes = await Promise.all(typesAPI.map(async(tipo)=>await Type.findOrCreate({where:{name:tipo}})))
        
        const typesDB = crearTypes.map(array=>array[0])


         res.status(200).json(typesDB);
       
     } catch (error) {
       console.error(error);
       res.status(500).send('Internal server error');
     }
 })
 
 module.exports=router;