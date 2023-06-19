 import { useParams } from "react-router-dom";
 import { useDispatch, useSelector } from "react-redux";
 import {  useEffect } from "react";
 import { getPokemonDetail } from "../../redux/actions";
import style from "./Detail.module.css"

const Detail = () => {
 
  //id viene por params "pokemons/:id" 
  //utilizo el estado pokemonDetail ya establecido en el reducer, donde guardo solo el detalle a mostrar
  const {id} = useParams()
  const pokemon = useSelector(state=>state.pokemonDetail)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemonDetail(id))
  },[id]);
          
  return(  
    <div className={style.containerPage}>
      <div className={style.containerImage}>
      
       <img className={style.image} src={pokemon?.image} alt="pok" />
      </div>
     <div className={style.containerDetails}>
       <h2 className={style.name}>Name: {pokemon?.name} </h2>
       <h2 className={style.otherDetail}>Pokedex ID: {pokemon?.id} </h2> 
       <h2>HP: {pokemon?.hp}</h2>
       <h2>Attack: {pokemon?.attack}</h2>
       <h2>Defense: {pokemon?.defense}</h2>
       <h2>Speed: {pokemon?.speed}</h2>
       <h2>Height: {pokemon?.height}0 cm</h2>
       <h2>Weight: {pokemon?.weight}00 grams</h2>
       <h2>Types: {pokemon?.types?.map(e=>e.name).join(", ")}</h2>
     </div>
    </div>
  )
 }
export default Detail;

