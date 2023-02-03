import React from "react";
import { Link } from 'react-router-dom';
import style from "./LandingPage.module.css";
import background from '../../Images/2533.png';

const LandingPage = (props) => {
    return(
        <div className={style.div} style={{ backgroundImage: `url(${background})`, backgroundSize: 2000 }}>
            <h1 className={style.play}>Welcome!</h1>
            <Link to={'/home'} style={{ textDecoration: 'none' }}>
                <button class={style.button}>PLAY</button>
            </Link>
        </div>
    )
}

export default LandingPage;