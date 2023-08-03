import { GET_ALL_POKEMON,GET_ID_DETAIL,SEARCH_NAME,GET_TYPES,DELETE_POKEMON,POST_POKEMON,FILTER_POKEMON,ORDER_BY_NAME,ORDER_BY_ATTACK } from "./action-types";
import axios from "axios";
axios.defaults.baseURL = 'https://pi-pokemon-main-production-28a3.up.railway.app';
//este axiosdefaults es para no tener que escribir todo el url en cada action

export const getAllPokemon = ()=>{
    return async (dispatch)=>{
        const {data} = await axios.get('/pokemons')
        return dispatch({type:GET_ALL_POKEMON,payload:data})
    }
}

export const getPokemonDetail=(id)=>{
    return async(dispatch)=>{
        let info = await axios.get(`/pokemons/${id}`);
        return dispatch({type:GET_ID_DETAIL,payload:info.data})
    }
}

export const pokemonFilter = (payload)=>{
    return { type: FILTER_POKEMON, payload }
}


export const searchName = (payload)=>{
    return async (dispatch) => {
        try {
            let info = await axios.get(`/pokemons?name=${payload}`);
            return dispatch({ type: SEARCH_NAME, payload: info.data })
        } catch (error) {
            console.log('Error al buscar el pokemon', error);
        }
    }
}

export const getTypes = ()=>{
    return async (dispatch)=>{
        const {data} = await axios.get('/types')
        return dispatch({type:GET_TYPES,payload:data})
    }
}

export const postPokemon = (payload)=>{
    return async function (dispatch) {
        try {
          const response = await axios.post(
            "https://pi-pokemon-main-production-28a3.up.railway.app/pokemons",
            payload
          );
          return dispatch({
            type: POST_POKEMON,
            payload: response.data,
          });
        } catch (error) {
          throw error;
        }
      };
}

export const orderByName = (name)=>{
    return { type: ORDER_BY_NAME, payload:name }
}

export const orderBy = (attack)=>{
    return { type: ORDER_BY_ATTACK, payload:attack }
}

export const deletePokemon = (payload)=>{
    
    return async(dispatch)=>{
        try {
            let info= await axios.delete(`/pokemons?name=${payload}`)
            return dispatch({type: DELETE_POKEMON, payload:info.data})
        } catch (error) {
            console.log("Error al borrar el pokemon",error)
        }
     }
}
