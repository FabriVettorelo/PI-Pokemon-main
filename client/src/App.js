import './App.css';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Routes, Route,useLocation, useNavigate} from "react-router-dom"; //vamos a definir las rutas de la pagina, envolvemos cada route dentro routes
//React Router DOM -> biblioteca utilizada en React para la navegación y el enrutamiento con componentes. 
import Detail from './components/Detail/Detail';
import Nav from './components/Nav/Nav';
import Types from './components/Types/Types';
import Form from './components/Form/Form';

function App() {
  const location = useLocation();
  return ( //Nav tiene un renderizado condicional, aparece solo si estamos fuera de la landing page
    <div className="App">
      {location.pathname !== "/" ? <Nav /> : null} 
      <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/detail/:id" element={<Detail/>}/>
      <Route path="/types" element={<Types/>}/>
      <Route path="/post" element={<Form/>}/>
     </Routes>
    </div>
  );
}

export default App;
