const { Pokemon, conn } = require('../../src/db.js');//importo el modelo y la conexion para trabajar con la DB

describe('Pokemon model', () => { //bloque de descripcion para agrupar las pruebas del modelo pokemon
  beforeAll(() => conn.authenticate()//antes que nada autenticamos la conexion a la DB
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => { //aqui se agrupan las pruebas de validacion de modelo
    beforeEach(() => Pokemon.sync({ force: true })); //sincronizamos con el modelo pokemon y el force true borra la tabla y la inicia nuevamente
    describe('name', () => { //bloque descriptivo para prueba con name
      it('should throw an error if name is null', (done) => {
        Pokemon.create({}) //aqui creo un pokemon sin nombre (null) y esperamos recibir un error, done es para finalizar la prueba
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => { //finalmente se prueba con un nombre valido, ingresamos tambien todos los datos obligatorios ya que sequelize tira error si no lo hacemos
        Pokemon.create({ name: 'Pikachu',hp:3,attack:3,defense:3,image:"pikachu.jpg" });
      });
    });
  });
  afterAll(() => {
    console.log('Test summary:');
    console.log('--------------');
  });
});
