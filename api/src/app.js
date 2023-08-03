const express = require('express'); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan'); 
const routes = require('./routes/index.js'); 

require('./db.js');
//establezco el servidor
const server = express(); 

server.name = 'API';
//middlewares
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); //función que se utiliza en el entorno de Node.js para analizar los datos enviados desde un formulario HTML a través de una solicitud POST
server.use(bodyParser.json({ limit: '50mb' })); //traduce json a js 
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes); //rutas que vamos a usar

// Error catching endware.
server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server; //exporto servidor para levantar en index
