import { NavLink } from "react-router-dom";
import style from "./Landing.module.css"
import soundFile from "../../audio/search.mp3"
import { useRef, useState } from "react";

const Landing = ()=>{
  //estado para reproducir audios al hacer click en links
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  //este handler hace que se reproduzca el audio al hacer click
  const handleButtonClick = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };
  //este componente landing sirve como bienvenida al sitio y tiene enlaces a mi github y linkedin a modo de "about me"
    return(
        <div className={style.landing}>
        <div className={style.text}>
        <h2>Welcome to the Pokedex!</h2>
        <h3>The definitive guide for Pokemon trainers</h3>
        <button className={style.button} onClick={handleButtonClick}><NavLink to="/home"> Access! </NavLink></button>
        <audio ref={audioRef} src={soundFile} onEnded={() => setIsPlaying(false)} />
        </div>
<div className={style.imgcontainer}>
        <a
            href="https://www.linkedin.com/in/fabrizio-vettorelo-0629a3263/"
            target="_blank"  onClick={handleButtonClick}
            rel="noreferrer"
          >
            <img src="https://cdn.icon-icons.com/icons2/2997/PNG/512/linkedin_logo_icon_187625.png" alt="linkedin" className={style.img} />
          </a> 
          <a
            href="https://github.com/FabriVettorelo"
            target="_blank"  onClick={handleButtonClick}
            rel="noreferrer"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" alt="github" className={style.img} />
          </a>
</div>
        </div>
    )
}
export default Landing;
