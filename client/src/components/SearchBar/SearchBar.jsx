import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../../redux/actions";
import style from "./SearchBar.module.css"


export default function SearchBar(props) {
   
   const dispatch = useDispatch();
   const [name, setName] = useState("");

   const handleChange = (event) => {
      const value = event.target.value
      setName(value)
   }

   const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(searchName(name));
      setName('')
      props.onPageChange(1);
  };

   return (
   <div className={style.searchbar}>
      <input className={style.input} type='search' placeholder=' Search Pokemon name ' value ={name} onChange={(event) => handleChange(event)}/>
      <button className={style.button} type='submit' onClick={(event) => handleSubmit(event)}>Search</button>
   </div>
   );
}

//<button className={style.search}>← Find</button>