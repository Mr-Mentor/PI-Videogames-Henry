import style from './Game.module.css';
import { Route} from 'react-router-dom';

const Game = ({name, image, genres, id}) => {
    
    return(
        <div className={style.card}>
            <h4>{name}</h4>
            <img src={image} alt='Image not found' className={style.img} />
            <p>Genres:</p>
            <ul className={style.list}> 
                {genres.map( genre => <li key={genre.name ? genre.name : genre}>{genre.name ? genre.name : genre}</li>)}
            </ul>
            <Route render={({history}) => (<button className={style.btn} onClick={() => { history.push(`/detail/${id}`) }}>Details</button>)}/>
        </div>
    )
};

export default Game;