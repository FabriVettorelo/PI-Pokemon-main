require('dotenv').config();
const { Sequelize } = require('sequelize'); //sequelize nos sirve para comunicarnos con la DB comunica traduciendo sql con js
const fs = require('fs'); //para leer la carpeta models
const path = require('path');
//const { DB_USER, DB_PASSWORD, DB_HOST } = process.env; //para uso local
const { DB_DEPLOY} = process.env;
const sequelize = new Sequelize( 
   DB_DEPLOY, 
   {
      logging: false,
      native: false,
      dialectOptions: {
         acquireTimeout: 9000,
         ssl: {
           require: true,
           rejectUnauthorized: false // Solo si tienes problemas con certificados autofirmados
         }
       } 
   }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, definimos los modelos por cada nombre del archivo, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

// Hacemos la conexion sequelize a todos los modelos del arreglo
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos : product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring, en este caso hay 2 
const { Pokemon, Type } = sequelize.models;

// Aca vendrian las relaciones
Pokemon.belongsToMany(Type, {through:"pokemonType"}) //un pokemon puede tener varios type
Type.belongsToMany(Pokemon, {through:"pokemonType"}) //un type lo pueden tener varios pokemon

module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
