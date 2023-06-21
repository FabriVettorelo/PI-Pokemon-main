import React from 'react';
import ReactDOM from 'react-dom/client'; //se utiliza para crear una instancia de renderizado enraizada (root) para la app de React
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"; //habilita la navegación basada en enrutamiento en React y sincronizar las URL con los componentes correspondientes.
import App from './App';
import store from './redux/store';
import {Provider} from 'react-redux';

//Provider es un componente de react-redux con el cual se envuelve la app React para dar acceso al almacén de Redux a todos los componentes descendientes. 
//facilita el acceso al estado global y a las funciones dispatch en todos los componentes de la app.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
     <BrowserRouter>
       <App />
     </BrowserRouter>
     </Provider>,
);
//root es el punto de montaje para la pagina,  se utiliza para renderizar la app de React en el elemento DOM 



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
