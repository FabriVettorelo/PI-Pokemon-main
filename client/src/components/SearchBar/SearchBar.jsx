import { useState,useRef } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../../redux/actions";
import style from "./SearchBar.module.css"
import soundFile from "../../audio/search.mp3"


export default function SearchBar(props) {

 //estado para reproducir audios al hacer click en links
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

   const dispatch = useDispatch();
   const [name, setName] = useState("");
//estado del nombre que vamos a introducir en la searchbar, la searchbar es exclusivamente para buscar por nombre
   const handleChange = (event) => {
      const value = event.target.value
      setName(value)
   }
//una vez que hagamos click en search este handle submit enviara la informacion y setea a name en "" para poder realizar otra busqueda sin tener que borrar
//tambien vuelve a la pagina 1 que es donde veremos el resultado del name ya que se espera un unico resultado
   const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(searchName(name));
      setName('')
      props.onPageChange(1);
      handleButtonClick()
  };
    //este handler hace que se reproduzca el audio al hacer click
    const handleButtonClick = () => {
      setIsPlaying(true);
      audioRef.current.play();
    };
//para indicar la funcion de la searchbar hay un placeholder que dice "buscar nombre de pokemon"
   return (
   <div className={style.searchbar}>
      <input className={style.input} type='search' placeholder=' Search Pokemon name ' value ={name} onChange={(event) => handleChange(event)}/>
      <button className={style.button} type='submit' onClick={(event) => handleSubmit(event)}>Search</button>
      <audio ref={audioRef} src={soundFile} onEnded={() => setIsPlaying(false)} />
      <button className={style.button} type='submit' onClick={(event) => props.handleFilter(event)}>Reset Search</button>
   </div>
   );
}
