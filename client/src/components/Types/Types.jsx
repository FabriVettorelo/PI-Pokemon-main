import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions";
import { useEffect } from "react";
import style from "./Types.module.css"

const Types = ()=>{


const dispatch = useDispatch();
//este componente fue creado como un extra para explicar los diferentes tipos de pokemons y explayar las habilidades asi como los pro y contra de cada uno
//este traia los tipos e iba a introducir manualmente informacion extensa sobre cada type, esto requeria mucha informacion y tiempo, para simplificar se coloco una imagen donde se muestran todos los tipos y un hipervinculo que lleva a una guia donde se explica bien a fondo todo esto
useEffect(()=>{
    dispatch(getTypes())
},[dispatch])

    return(
  <div className={style.background}>     
  <h2 className={style.title}>Pokemon Types</h2> 
<div className={style.imagen}>
<img src="https://static.vecteezy.com/system/resources/previews/000/119/820/original/free-type-pokemon-vector.png" alt="" />
</div>
<div className={style.link}>

<a href="https://pokemon.fandom.com/wiki/Types">→ Guide to stats, abilities and strategies ←</a>
</div>

</div>
    )
}
export default Types;