import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions";
import { useEffect } from "react";
import style from "./Types.module.css"

const Types = ()=>{


const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getTypes())
},[dispatch])

const types = useSelector(state=>state.poketypes)
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