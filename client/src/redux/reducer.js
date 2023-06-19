import { GET_ALL_POKEMON,GET_ID_DETAIL,SEARCH_NAME,GET_TYPES,DELETE_POKEMON,POST_POKEMON,FILTER_POKEMON,ORDER_BY_ATTACK } from "./action-types";
const initialState = {
    pokemon: [], //los pokemon que vamos a ir viendo, filtrando y ordenando
    allPokemon: [], //todo el total de pokemon
    poketypes: [], //los type de pokemon
    pokemonDetail: [], //el detail para cuando busquemos uno
}
const reducer=(state=initialState,{type,payload})=>{
 switch(type){
    case GET_ALL_POKEMON:
        return{...state, pokemon:payload, allPokemon:payload};

    case GET_ID_DETAIL:
        return{...state, pokemonDetail:payload}


        //en el caso de los filtros estos se pisaban entre si reemplazando el valor del estado asi que se combinaron todos en un condicional de esta forma
        //podemos mezclarlos tranquilamente y obtendremos siempre el resultado correcto buscado 
    case FILTER_POKEMON:
        let pokemonFilt = [...state.allPokemon]
        console.log(payload)
        if(payload.type==="" && payload.origin===""){pokemonFilt=state.allPokemon}
        if(payload.type !== "All"){
            pokemonFilt=pokemonFilt.filter((pokemon)=>pokemon.types.find(type=>type.name===payload.type))
        }
        if(payload.origin !== "All"){
            if(payload.origin==="Created"){
                pokemonFilt=pokemonFilt.filter(pokemon=>pokemon.created===true)
            }
            if(payload.origin==="Originals"){
                pokemonFilt=pokemonFilt.filter(pokemon=>pokemon.created!==true)
            }
        }
        return {...state,pokemon:pokemonFilt}

    case SEARCH_NAME:
        let PokeBuscados = payload;
            let pokesfilt = state.pokemon;
            if(state.pokemon!==state.allPokemon){
               PokeBuscados = pokesfilt.filter((pokemon) => payload.some((pok) => pok.id === pokemon.id))
            }
        return {...state, pokemon: PokeBuscados};
        // para que SEARCH_NAME busque en todos los pokemon solo hace falta poner    return{...state,pokemon:payload}
    case GET_TYPES:
        return {...state, poketypes:payload}

    case POST_POKEMON:
        return{...state,pokemon: [...state.pokemon,payload] } 
    
    case ORDER_BY_ATTACK:
        const allpok = [...state.pokemon]
       //order va a solamente cambiar el orden en que se muestran las cosas que tenemos en el estado pokemon, asi que dependiendo de lo que recibimos los reorganizamos dif
        if(payload==="norm"){return {...state,pokemon:allpok.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))}}
        if(payload === "asc"){return {...state,pokemon: (allpok.sort((a, b) => parseInt(a.attack, 10) - parseInt(b.attack, 10)))}}
        if(payload==="desc"){return {...state,pokemon:(allpok.sort((a, b) => parseInt(b.attack, 10) - parseInt(a.attack, 10)))}}
        if(payload==="ascName"){return {...state,pokemon:(allpok.sort((a, b) => a.name.localeCompare(b.name)))} }
        if(payload==="descName"){return {...state,pokemon: (allpok.sort((a, b) => b.name.localeCompare(a.name))) } }
        break

    case DELETE_POKEMON:
        return {...state}
        
    default:
        return{...state};
 }
    
}
export default reducer;





    // case FILTER_BY_TYPE:
    //     const allPokemon = state.allPokemon
    //     const filtered = payload === "All" ? state.allPokemon : allPokemon.filter()
    //     return{...state,  pokemon: filtered};

    // case FILTER_BY_ORIGIN:
    //     const allPokem = state.allPokemon
    //     const creados = allPokem.filter(pokemon=>pokemon.created===true)
    //     const originales = allPokem.filter(pokemon=>pokemon.created!== true)
    //     if(payload === "All") {return {...state,pokemon:allPokem}}
    //     if(payload === "Created") {return {...state, pokemon: creados}}
    //     if(payload === "Originals") {return {...state, pokemon: originales}}
    //     break
