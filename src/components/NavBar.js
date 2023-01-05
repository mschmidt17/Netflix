
import profile from "../assets/Images/avatar.png";
import {BsBell} from "react-icons/bs";
import NewMovies from "./NewMovies.js";
import Menu from "./Menu.js";
import style from "../css/navBar.module.css";


function NavBar() {


    return (
        <nav className={style.navBar}>
            <div className={style.logo}>
                <p className={style.net}><b>NET</b>FLIX</p>
            </div>

            <div className={style.agregar}>
                <NewMovies/>
            </div>

            <div className={style.navOptions}>
                <Menu/>
                <div>
                    <div className={style.bellNotif}/>
                    <BsBell className={style.bellIcon}/>
                </div>
                <img src={profile} alt="profile" className={style.profile}/>
            </div>
        </nav>
    );
}

export default NavBar;
