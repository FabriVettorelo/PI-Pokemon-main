import SearchBar from "../SearchBar/SearchBar"
import style from "./Nav.module.css"
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
    <div className={style.bar}>
        
        
        <button className={style.input}><NavLink to="/home">Home</NavLink></button>
        <button className={style.input}><NavLink to="/types">Guide to Types</NavLink></button>
        <button className={style.input}><NavLink to="/post">Create!</NavLink></button>
        <button className={style.exit}><NavLink to="/"> X </NavLink> </button>

    </div>
    )
}

export default Nav;