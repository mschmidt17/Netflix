import style from "../css/card.module.css"
import {BsPlay} from "react-icons/bs";
import {AiFillStar} from "react-icons/ai";
import Fade from 'react-reveal/Fade';


function Card({ movie }) {
  
  return (
    <>
    {movie.backdrop_path ? ( 
        <div className={style.background} style={{"backgroundImage":`url(${`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`})`}}>
            <div className={style.container}>
              <div className={style.noHover}>
                <div className={style.circle}><BsPlay/></div>
                <p className={style.title}>{movie.title}</p>
              </div>
              <Fade right>
                <div className={style.cardHover}>
                  <p> <AiFillStar className={style.icon}/> {movie.vote_average}</p>
                  <p>{movie.release_date.slice(0,4)}</p>
                </div>
              </Fade>
            </div>
        </div>
    ) :(
      <div className={style.background} style={{"backgroundImage":`url(${JSON.parse(movie).image}`}}>
        <div className={style.container}>
          <div className={style.noHoverMP}>
            <div className={style.circle}><BsPlay/></div>
            <p className={style.title}>{JSON.parse(movie).movieTitle}</p>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default Card;