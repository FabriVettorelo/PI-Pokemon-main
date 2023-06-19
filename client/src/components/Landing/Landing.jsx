import { NavLink } from "react-router-dom";
import style from "./Landing.module.css"
import soundFile from "../../audio/pokemon.mp3"
import { useRef, useState } from "react";

const Landing = ()=>{
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleButtonClick = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };
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
