// import { connect } from "react-redux";
// import { useState , useEffect} from "react";
import { Link , useLocation} from "react-router-dom";
import style from './Card.module.css'

// const Card = ({id,name,types,image})=>{
//   let location = useLocation()
  

import React from "react";


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



