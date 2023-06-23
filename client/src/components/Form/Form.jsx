import { useState,useRef } from "react";
import { useDispatch } from "react-redux";
import { deletePokemon, getAllPokemon, postPokemon } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./Form.module.css"
import soundFile from "../../audio/pokemon.mp3"

//la funcion reload es para recargar la pagina 
const reload = () => {
  window.location.reload(false);
}

const Form = ()=>{
  //traemos el estado All Pokemon y a los creados que servira para identificarlos como opciones a eliminar
     const pokemonsall = useSelector((state)=> state.allPokemon)
     const pokemons = pokemonsall.filter((pokemon) => pokemon.created === true)
    //este estado es para deshabilitar un boton
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const dispatch = useDispatch();
    //estado para reproducir audios al hacer click en submit
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
    // este estado son los valores del form , asi lo veremos inicialmente vacio
    const [form,setForm] = useState({
        name:"",
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0,
        image:"",
        typeId:[]
    })

    const [errors, setErrors] = useState({});
    //necesitamos un estado con los errores para señalar cuando sea necesario hacer un cambio en el form
    const handleSelectType = (event) => {
      //funcion para ir añadiendo los type uno a continuacion del otro, al seleccionar un type se limpia el errors por que significa que ya tenemos un type (el minimo necesario para crear un pokemon)
        const selected = event.target.value;
        setForm((form) => ({
          ...form,
          typeId: [...form.typeId, selected],
        }));
        setErrors((errors) => ({
          ...errors,
          typeId: "",
        }));
      };

//este handleChange agrega cada cambio en el form y realiza la validacion para ver si hay errores
    const handleChange = (event) => {
        setForm({
          ...form,
          [event.target.name]: event.target.value});
        setErrors(
            validate({
              ...form,
              [event.target.name]: event.target.value})
          )};


// esta es la funcion validate la cual hara que se muestren errores en nuestro form en caso de que algo no se este cumpliendo
    const validate = (form) => {
        let errors = {};
    
        if (!form.name) {errors.name = "Name required";}
        //el nombre es obligatorio
        if (/\d/.test(form.name)) {errors.name = "Cannot contain numbers on Name";}
        // mediante regex establecemos que no uede contener digitos del 0 al 9, debe ser solo letras
        if (form.hp < 1 || form.hp > 200) {errors.hp = "Health Points must be between 1 and 200";}
        //nos aseguramos que el valor de vida no sea cero y no exceda 200
        if (form.attack < 1 || form.attack > 200) {errors.attack = "Attack points must be between 1 and 200";}
        //nos aseguramos que tenga ataque y no exceda 200
        if (form.defense < 1 || form.defense > 200) {errors.defense = "Defense points must be between 1 and 200";}
        //nos aseguramos que tenga defensa y no exceda 200
        if (form.image === "") {errors.image = "Image URL required";}
        //aqui se sube la url de la imagen
        if (form.typeId.length<=0 ) {errors.typeId = "One type is required";}
        //nos aseguramos que tenga al menos un tipo
        return errors;
      };

      //al realizar el submit de los datos, handlesubmit valida que no haya errores, y se fija que el nombre no exista
      const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validate(form))
        const error = validate(form)
        const existname = pokemonsall.find(pok => pok.name.toLowerCase()=== form.name.toLowerCase())?1:0;
        if(existname===1){alert("This Pokemon already exists!")} //en caso de que exista el nombre, avisa con un alert
        else if (Object.values(error).length!==0){alert("must fullfill required values")} //si falta algun dato obligatorio tambien avisa con un alert
        else{
        //si todo esta validado y listo para crear ,se despachan los datos y se avisa con un alert que el pokemon fue creado
        dispatch(postPokemon(form));
        alert("Pokemon Created!");
        handleButtonClick()
        setForm({name:"",
          hp:0,
          attack:0,
          defense:0,
          speed:0,
          height:0,
          weight:0,
          image:"",
          typeId:[]});
          reload()
           //se vacian los campos del form 
        }
  
      };
//estado para el pokemon que va a ser eliminado
    const [delPok,setdelPok] = useState("");
//estas funciones sirven para la seleccion del pokemon a eliminar y para el submit de la accion de eliminarlo
    const handleSelectDelete = (event)=>{
      setdelPok(event.target.value)
    }
    const handleSubmitDelete = (event)=>{
      event.preventDefault();
      if(delPok.length<=0)alert("You must select a Pokemon"); //si le damos a delete sin haber seleccionado nada, un alert nos dira que necesitamos seleccionar algo si queremos eliminarlo
      else{
        dispatch(deletePokemon(delPok));
        handleButtonClick()
        alert("Pokemon Deleted"); //si el pokemon es eliminado exitosamente un alert nos avisa y se setea como vacio el estado de pokemons a eliminar, se refreshea la pagina
        setdelPok("");
        reload()
      }
    }
    //este handler hace que se reproduzca el audio al hacer click
  const handleButtonClick = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };
    
    //estos son los campos requeridos en el form, los datos obligatorios, si estos campos no han sido rellenados el boton de submit no se habilita
    useEffect(() => {
        const requiredFields = [
          "name",
          "hp",
          "attack",
          "defense",
          "image",
          "typeId",
        ];
        const allFieldsHaveValue = requiredFields.every((field) => form[field]);
        setButtonDisabled(!allFieldsHaveValue);
      }, [form]);
    
      useEffect(()=>{
        dispatch(getAllPokemon())
      },[dispatch])

      useEffect(()=>{
        dispatch(deletePokemon())
      },[dispatch]);


//en el siguiente form se introduciran los datos, cada div imput contiene el label donde dice que dato se debe introducir
// el input donde se escribe el dato y el error que se va a marcar indicando lo que se debe corregir en caso de que sea necesario
    return(
        <div className={style.container}>
    <h1 className={style.title}>Create new Pokemon!</h1>
    <div className={style.content}> 
    <div className={style.post}>
      <img src="https://i.pinimg.com/originals/24/af/b5/24afb5ce532d3c987ad858fab9de703f.gif" alt="" />
    </div>

    <form className={style.form} onSubmit={handleSubmit}> 

      <div className={style.divInput}>
        <label className={style.label}>Name:</label>
        <input className={style.input} type={"text"} value={form.name} name="name" onChange={handleChange}/>
        {errors.name && <p className={style.error}>{errors.name}</p>}</div>
  
      <div className={style.divInput}>
        <label className={style.label}>Life:</label>
        <input className={style.input} type={"number"} value={form.hp} name="hp" min="0" onChange={handleChange}/>
        {errors.hp && <p className={style.error}>{errors.hp}</p>}</div>
  
      <div className={style.divInput}>
        <label className={style.label}>Attack:</label>
        <input className={style.input} type={"number"} value={form.attack} name="attack" min="0" onChange={handleChange}/>
        {errors.attack && <p className={style.error}>{errors.attack}</p>}</div>
  
      <div className={style.divInput}>
        <label className={style.label}>Defense:</label>
        <input className={style.input} type={"number"} value={form.defense} name="defense" min="0" onChange={handleChange}/>
        {errors.defense && (<p className={style.error}>{errors.defense}</p> )}</div>
  
      <div className={style.divInput}>
        <label className={style.label}>Speed:</label>
        <input className={style.input} type={"number"} value={form.speed} name="speed" min="0" onChange={handleChange}/></div>
  
      <div className={style.divInput}>
        <label className={style.label}>Height:</label>
        <input className={style.input} type={"number"} value={form.height} name="height" min="0" onChange={handleChange} /></div>
  
      <div className={style.divInput}>
        <label className={style.label}>Weight:</label>
        <input className={style.input} type={"number"} value={form.weight} name="weight" min="0"  onChange={handleChange} /></div>
  
      <div className={style.divInput}>
        <label className={style.label}>Image:</label>
        <input className={style.input} type={"text"} value={form.image} name="image" onChange={handleChange}/>
        {errors.image && <p className={style.error}>{errors.image}</p>}</div>
  
      <div className={style.divInput}>
        <label className={style.label}>Types:</label>
        <input className={style.input} type={"text"} value={form.typeId.join(", ")} name="typeId" readOnly={true}/>
        {errors.typeId && <p className={style.error}>{errors.typeId}</p>}</div>
        
  
      <select className={style.label} disabled={form.typeId.length>=2} onChange={handleSelectType}>
<option className={style.label} value="" disabled selected>Select Types</option>     
       
<option value="1">#1 Normal</option>
<option value="2">#2 Flying</option>
<option value="3">#3 Fighting</option>
<option value="4">#4 Poison</option>
<option value="5">#5 Ground</option>
<option value="6">#6 Rock</option>
<option value="7">#7 Bug</option>
<option value="8">#8 Ghost</option>
<option value="9">#9 Steel</option>
<option value="10">#10 Fire</option>
<option value="11">#11 Water</option>
<option value="12">#12 Grass</option>
<option value="13">#13 Electric</option>
<option value="14">#14 Psychic</option>
<option value="15">#15 Ice</option>
<option value="16">#16 Dragon</option>
<option value="17">#17 Dark</option>
<option value="18">#18 Fairy</option>
<option value="19">#19 Unknown</option>
<option value="20">#20 Shadow</option>
 </select>
            
  <button className={style.label} type="submit" disabled={buttonDisabled}>
      Create
  </button>
  <audio ref={audioRef} src={soundFile} onEnded={() => setIsPlaying(false)} />
  </form>
<hr/>
<h2>Delete Pokemon</h2>
<form onSubmit={(event) => handleSubmitDelete(event)}>
  <select className={style.label} onChange={handleSelectDelete} >
    <option className={style.label} value="" disabled selected>Select Pokemon</option>     
    {pokemons && pokemons.map((pokemon)=>{
      return(
        <option className={style.label} value={pokemon.name} key={pokemon.name}>{pokemon.name}</option> 
      )
    })}

 </select>
  <button className={style.label} type="submit" >Delete</button>
</form>
      
</div>


   </div>
    )
}
export default Form;

