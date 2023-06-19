const session = require('supertest-session'); //importamos supertest que proporciona una sesion de prueba similar a solicitudes de http en el server
const app = require('../../src/app.js'); //importamos app ya que este modulo contiene la logica y rutas de la aplicacion
const { Type, conn } = require('../../src/db.js'); //aqui importo el modelo y la conexion para interactuar con la DB

const agent = session(app); //aqui se crea una nueva instancia de sesion con el supertest session, es para hacer solicitudes en las pruebas
const type = {  //objeto de prueba, un type con su name
  name: 'flying',
};

describe('Types routes', () => { //etiqueta descriptiva para nuestro bloque de pruebas
  beforeAll(() => conn.authenticate() //previo a las pruebas se autentica la conexion con la DB
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Type.sync({ force: true }) //antes de cada prueba sincroniza el modelo con la DB, force true indica que se elimine elimina y vuelve a crear las tablas 
    .then(() => Type.create(type))); //aqui se crea el tipo
  describe('GET /types', () => { //hago una prueba con solicitud get a /types y se espera un codigo 200 de que salio todo bien
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });
  
});
