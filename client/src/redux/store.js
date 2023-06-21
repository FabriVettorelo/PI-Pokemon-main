import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';// biblioteca de middleware: se utiliza para controlar las acciones asíncronas en Redux(como solicitudes a una API) y permite que las acciones retornen funciones en lugar de objetos simples.
import reducer from './reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
//compose es una funcion para combinar mejoras (enhancers), en este caso busca las devtools que proporcionan una interfaz gráfica para inspeccionar y depurar el estado y las acciones de la aplicación.

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))  
);
//esta funcion crea el store que es un almacen de redux (objeto centralizado que almacena el estado de toda la aplicación)
//ademas de incluir thunk y devtools, lo hace con el reducer que es el que define cómo se manejan las acciones y que actualiza el estado en la app (store necesita estado + reducer + actions)


export default store;