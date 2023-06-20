//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// aqui es donde iniciaremos la aplicacion
const server = require('./src/app.js');//importo el servidor 
const { conn } = require('./src/db.js');
conn.sync({ force: true }).then(() => { //sincronizamos con la DB y force true hara que se reinicien las tablas cada vez que iniciamos, para cambiar esto debemos utilizar alter:true
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // levanta el servidor en el puerto 3001 y nos avisa
  });
});
