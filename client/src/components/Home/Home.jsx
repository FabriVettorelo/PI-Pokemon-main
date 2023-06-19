import Card from "../Card/Card";
import { useEffect,useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import style from './Container.module.css'
import { getAllPokemon } from "../../redux/actions";
import { pokemonFilter, orderBy} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import Paginado from "../Paginado/Paginado";
import soundFile from "../../audio/pokemon.mp3"
import { useRef } from "react";

const reload = () => {
    window.location.reload(false);
  }

const Home = () => {
   //utilizamos el estado pokemon establecido en el reducer para los pokemons a presentar en el home
    const pokemons = useSelector(state=>state.pokemon)
    const dispatch = useDispatch();
    //estado para el paginado
    const [currentPage, setCurrentPage] = useState(1);
    const elementsPerPage = 12; //establezco la cantidad por pagina
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage; //creo los index para el primer y ultimo item, luego ya que pokemons es un array, hago un slice para dividir lo que voy a mostrar en cada pagina
    const currentElements = pokemons?.slice(indexOfFirstElement, indexOfLastElement);
   //para reproducir audio al filtrar 
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    //estado para resetear el ordenamiento al filtrar
    const [orderFilter, setOrderFilter] = useState("norm");
    //estados para cada filtro, esto ayuda a que no se pisen los filtros entre si y todo funcione en conjunto
   const [typeFilter,setTypeFilter]=useState("All")
   const [originFilter,setOriginFilter]=useState("All")
    
    useEffect(()=>{
        dispatch(getAllPokemon())
    },[dispatch])
// HANDLERS
    //hander para el filtro por type de pokemon
    const handleFilterType = (event)=>{
        // setCurrentPage(1)
        // dispatch(filterByType(event.target.value))
        event.preventDefault()
        setTypeFilter(event.target.value)
    };
// este controla el filtro por origen
    const handleFilterOrigin = (event)=>{
        // setCurrentPage(1)
        // dispatch(filterByOrigin(event.target.value))
        event.preventDefault()
        setOriginFilter(event.target.value) 
    };
//finalmente este despacha las opciones seleccionadas en ambos filtros al hacer click, tambien vuelve a la pagina 1 ya que es una nueva busqueda y necesita mostrar desde el principio, y la cantidad de paginas va a ser diferente 
    const handleFilter = ()=>{
        handleButtonClick()
        setCurrentPage(1)
        let filters = {
            type: typeFilter,
            origin: originFilter
        }
        dispatch(pokemonFilter(filters))
        setOrderFilter("norm") //aqui "apagamos" el ordenamiento y lo ponemos en posicion normal, que es ordenado por id ascendente
    }
//este se encarga de reorganizar los items en el estado pokemon por attack o por name, solo altera el orden en que se muestran
    const handleOrder = (event)=>{
        setCurrentPage(1)  //tambien vuelve a la pagina 1 al iniciar un nuevo orden 
        const  selectvalue = event.target.value
        setOrderFilter(selectvalue)
        dispatch(orderBy(selectvalue))
    }
    //aqui obtenemos el total de paginas haciendo la division de la cantidad de pokemons a mostrar y la cantidad que ponemos en cada pagina, en nuestro caso es 12 por pagina
    const totalPages = Math.ceil(pokemons?.length / elementsPerPage)
   //este handler controla la pagina en la que estamos parados
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
  //este sirve para reproducir audio al hacer click en el boton de filtrado
      const handleButtonClick = () => {
        setIsPlaying(true);
        audioRef.current.play();
      };

    return (
        <div >

        <div ><SearchBar onPageChange={handlePageChange}/></div>
    <div className={style.barra}>
<select className={style.select}  onChange={handleFilterType}>
        <option value="All">All Types</option>
        <option value="normal">Normal</option>
        <option value="fighting">Fighting</option>
        <option value= "flying">Flying</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="rock">Rock</option>
        <option value="bug">Bug</option>
        <option value="ghost">Ghost</option>
        <option value="steel">Steel</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="psychic">Psychic</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="fairy">Fairy</option>
        <option value="unknown">Unknown</option>
        <option value="shadow">Shadow</option>
</select>
    
<select className={style.select}  onChange={handleFilterOrigin}>
        <option value="All">All Pokemons</option>
        <option value="Created">Created</option>
        <option value="Originals">Originals</option>
</select>

<button className={style.reload} type="submit" onClick={handleFilter} >←Apply Filters!</button>
<audio ref={audioRef} src={soundFile} onEnded={() => setIsPlaying(false)} />

<select className={style.select} onChange={handleOrder} value={orderFilter}>
        <option value="norm">Order by...</option>
        <option value="asc">Attack Low-High</option>
        <option value="desc">Attack High-Low</option>
        <option value="ascName">Names A-Z</option>
        <option value="descName">Names Z-A</option>

</select>


<button className={style.reload} onClick={()=>{reload()}}>Re-load Pokemons!</button>
    </div>

<div className={style.paginas}>
    <Paginado
      currentPage={currentPage}
      totalPages={totalPages}
      onChangePage={handlePageChange}/>
</div>
    <div className={style.container}>
        {currentElements.length!==0 ?
        currentElements.map(({id, name, image, types}) => {
            return (
               <Card
               key={id}
               id={id}
               name={name}
               types={types}
               image={image}
               />
            )})
            : (<p> --Pokemon Not Found--</p>)}
    </div>

    </div>
    )
}

export default Home;

    
