import {useEffect, useState} from "react";
import NavBar from "./NavBar.js";
import Card from "./Card.js";
import style from "../css/home.module.css";
import {AiOutlinePlus} from "react-icons/ai";
import {BsPlay} from "react-icons/bs";
import { getPopularMovies, getFeaturedMovies } from "../assets/functions.js";


function Home() {
  const [topMovie, setTopMovie] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  var i = 0;

  const getTopMovie = async () => {
    const favMovie = await getFeaturedMovies()
    const randomMovie = favMovie.sort(() => 0.5 - Math.random()).slice(0, 1);
    setTopMovie(randomMovie[0]);
  };

  const sideMovies = async () => {
    const movies = await getPopularMovies()
		const slice = movies.slice(5, 9)
    setPopularMovies(slice)
  }

  const getMyMovies = () => {
    const localStorageMovie = window.localStorage.getItem('movies')?.split("-").slice(0, 4);
    setPopularMovies(localStorageMovie)  
  };

  useEffect(() => {
    getTopMovie();
    sideMovies();
  }, []);


  const changeOrder = (e) =>{
    if (e.target.value === 'misPeliculas') {
      getMyMovies();
    } 
    else if (e.target.value === 'populares') {
      sideMovies();
    } 
  }

  return (
    <div className={style.container}>
        <NavBar/>
        <img src={`https://image.tmdb.org/t/p/original/${topMovie?.backdrop_path}`} alt="Top Movie" className={style.background}/>
        <main className={style.row}>
            <section className={style.homeLeft}>
                <h4 className={style.original}>ORIGINAL DE <b style={{"fontWeight":"700"}}>NETFLIX</b></h4>
                <span className={style.popular}>{topMovie.title}</span>
                <div className={style.btnHome}>
                  <button className={style.play}><BsPlay className={style.icon}/>REPRODUCIR</button>
                  <button className={style.list}><AiOutlinePlus className={style.plus}/> MI LISTA</button>
                </div>
            </section>

            <section className={style.homeRight}>
              <div className={style.select}> VER: 
                <select name={"atribute"} className={style.homeSelect} onChange={(e) => changeOrder(e)}>
                  <option name={"atribute"} value={"populares"}> POPULARES </option>
                  <option name={"atribute"} value={"misPeliculas"}> MIS PELICULAS</option>
                </select>
              </div>

            {popularMovies?.length > 0?
              popularMovies.map((movie) => 
                <Card key={movie.id || i++} movie={movie}/>)
             :
              <p className={style.noFound}>NO <br/> SE ENCONTRARON <br/>PELICULAS</p>
            }
          </section>
        </main>  
    </div>
  );
}

export default Home;
