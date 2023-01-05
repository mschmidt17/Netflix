import {HiOutlineMenuAlt3} from "react-icons/hi";
import profile from "../assets/Images/avatar.png";
import {BsBell} from "react-icons/bs";
import NewMovies from "./NewMovies.js";
import style from "../css/menu.module.css";
import Dropzone from "./Dropzone.js";
import { useState } from "react";




function Menu() {
  const [active, setActive] = useState(false)
  const [movieTitle, setMovieTitle] = useState("")
	const [image, setImage] = useState(null);
	const [uploaded, setUploaded] = useState(false);
  const [onError, setOnError] = useState(false)



  const handleClose = () => {
		setTimeout(() => {
			setMovieTitle("")
			setImage(null)
			setUploaded(false)
      setActive(false)
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
		else { 
      window.localStorage.setItem('movies', newMovie)
    }
		setUploaded(true)
  }


  const handleClick = () => {
    setActive(true)
  }


  return (
    <div>
      <button className={style.menuBtn} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <HiOutlineMenuAlt3/>
      </button>
       
      <div className={`offcanvas offcanvas-end ${style.background}`} tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" onClick={handleClose}></button>
          <p className={style.net}><b style={{"fontWeight":"700"}}>NET</b>FLIX</p>
          <div className={style.bellProfile}>
            <div>
              <div className={style.bellNotif}/>
              <BsBell className={style.bellIcon}/>
            </div>
            <img src={profile} alt="profile" className={style.profile}/>
          </div>
        </div>

        <div className={`offcanvas-body ${style.comun}`}>
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> INICIO </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> SERIES </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> PELICULAS </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> AGREGADAS RECIENTEMENTE </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> POPULARES</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> MIS PELÍCULAS </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> MI LISTA </a>
                    </li>
                    <li className={`nav-item ${style.newMovies}`}>
                      <NewMovies/>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> CERRAR SESIÓN </a>
                    </li>
                  </ul>
        </div>

        <div className={`offcanvas-body ${style.smartphones}`}>
          
                {!active? 
                  <ul className="navbar-nav flex-grow-1 pe-3">
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> INICIO </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> SERIES </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> PELICULAS </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> AGREGADAS RECIENTEMENTE </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> POPULARES</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> MIS PELÍCULAS </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> MI LISTA </a>
                    </li>
                    <li className={`nav-item`}>
                      <button className={style.addBtn} href="/" onClick={handleClick}> + AGREGAR PELÍCULAS</button>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/"> CERRAR SESIÓN </a>
                    </li>
                  </ul>
              : 
              <div>
                {!uploaded ? (
                  <div className={style.modal}>
                    <div className="">
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
                    <div className={style.buttons}>
                      <button type="button" className={style.submit} disabled={(!image || !movieTitle)} onClick={addMovie}>SUBIR PELICULA</button>
                      <button type="button" className={style.close} onClick={handleClose}>SALIR</button>
                    </div>
                  </div>
                  ):(
                    <div className={style.modal}>
                      <div className={style.medio2}>
                        <h2 className={style.congrats}>¡FELICITACIONES!</h2>
                        <h4 className={style.textCongrats}>{movieTitle} FUE CORRECTAMENTE SUBIDA.</h4>
                      </div>
                      <div className="">
                        <a href="/" type="button" className={style.submit2}>IR A HOME</a>
                      </div>
                    </div>
                  )}
              </div>
              }
        </div>
      </div>
    </div>
  );
}

export default Menu;

