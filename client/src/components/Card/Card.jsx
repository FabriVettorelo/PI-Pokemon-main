import { Link , useLocation} from "react-router-dom";
import style from './Card.module.css'
import React from "react";

//componente card que presentara solo la imagen con el nombre y los types
//el nombre sera un link hacia el detail correspondiente, el cual se busca mediante id
const Card = ({id, name, types, image}) => {
    return (
        <div className={style.listItem}>
  
         <img src={image} alt="pok" />
         <Link to={`/detail/${id}`} >  
         <h3>{name.toUpperCase()}</h3>
         </Link > 
        <h5>Types: {types.map(e=>e.name).join(", ")}</h5>
            
        </div>
    )
}


export default Card;



