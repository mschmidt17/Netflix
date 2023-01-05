import style from "../css/newMovies.module.css";
import {AiOutlinePlus} from "react-icons/ai"
import {useState} from "react";
import Dropzone from "./Dropzone.js";



function NewMovies() {

  const [movieTitle, setMovieTitle] = useState("")
	const [image, setImage] = useState(null);
	const [uploaded, setUploaded] = useState(false)
  const [onError, setOnError] = useState(false)


  const handleClose = () => {
		setTimeout(() => {
			setMovieTitle("")
			setImage(null)
			setUploaded(false)
      setOnError(false)
		}, 300);
	}

  const addMovie = () =>{ 
    const localStorage = window.localStorage.getItem("movies")
		const newMovie = JSON.stringify({movieTitle, image})

		if (localStorage) {
			const movies = `${localStorage}-${newMovie}`
      window.localStorage.setItem('movies', movies)
		}
		else { window.localStorage.setItem('movies', newMovie)}
		setUploaded(true)
  }


  return (
    <div>
      <div>
        <button type="button" className={style.addBtn} data-bs-toggle="modal" data-bs-target="#exampleModal">
          <AiOutlinePlus className={style.iconPlus}/> AGREGAR PELÍCULA
        </button>

        <div className={`modal fade`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{"backgroundColor":"#24242446"}}>
          <div className="modal-dialog modal-dialog-centered">
            
            {!uploaded ? (
              <div className={`modal-content ${style.modal}`}>
                <div className="">
                  <button type="button" className={`btn-close btn-close-white ${style.close}`} data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                  <h1 className={style.title} >AGREGAR PELICULA</h1>
                </div>
                <div className={style.medio}>
                  <Dropzone setImage={setImage} onError={onError} setOnError={setOnError}/>
                  <input 
                    placeholder="Título" 
                    value={movieTitle} 
                    onChange={(e) => setMovieTitle(e.target.value)}
                    className={style.input}
                  />
                </div>
                <div className="">
                  <button type="button" className={style.submit} disabled={(!image || !movieTitle)} onClick={addMovie}>SUBIR PELICULA</button>
                </div>
              </div>
            ):(
              <div className={`modal-content ${style.modal}`}>
                <div className="">
                  <button type="button" className={`btn-close btn-close-white ${style.close2}`} data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                  <p className={style.net}><b>NET</b>FLIX</p> 
                </div>
                <div className={style.medio2}>
                  <h2 className={style.congrats}>¡FELICITACIONES!</h2>
                  <h4 className={style.textCongrats}>{movieTitle} FUE CORRECTAMENTE SUBIDA.</h4>
                </div>
                <div className="">
                  <button type="button" className={style.submit} data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}>IR A HOME</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  export default NewMovies;
  