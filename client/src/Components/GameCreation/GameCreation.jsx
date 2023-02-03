import { useState, useEffect} from "react";
import { getGenres,createGame, getGames } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';
import style from './GameCreation.module.css'
import { Route } from "react-router-dom";


const GameCreation = (props) => {

    const genresDb = useSelector((state) => state.genres);
    const games = useSelector((state) => state.games);
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(getGenres())},[dispatch]);
    useEffect(()=>{dispatch(getGames())},[dispatch]);

    const platformsConst = ['Xbox', 'PlayStation', 'PC']

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [released, setReleased] = useState('');
    const [rating, setRating] = useState(0);
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState([]);
    const [platform, setPlatform] = useState('');
    const [platforms, setPlatforms] = useState([]);

    const [imageDisabled] = useState(false);
    const [nameDisabled, SetNameDisabled] = useState(true);
    const [descriptionDisabled, SetDescriptionDisabled] = useState(true);
    const [releasedDisabled, SetReleasedDisabled] = useState(true);
    const [ratingDisabled, SetRatingDisabled] = useState(true);

    const [errorMessage] = useState('');
    

    

    const submitHandler = (e) => {
        const newGame = {
            image,
            name,
            description,
            released,
            rating,
            genres,
            platforms
        }
        let game = [...games].filter( g => g.name.toLowerCase() === name.toLowerCase())
        if(game.length){
            window.alert('This game already exist!.');
            return;
        }
        if(!genres.length){
            window.alert('You need to select a genres.')
            return;
        }
        if(!platforms.length){
            window.alert('You need to select a platfors.')
            return;
        }
        if(isNaN(rating)){
            window.alert('Rating has to be a number.')
            return;
        }
        if(rating>10||rating<0){
            window.alert('Rating has to be a number between 0 and 10 .')
            return;
        }
        const validDate = new Date(released)
        if(!(validDate>0)){
            window.alert('Released has to be a Date.')
            return;
        }
        props.createGame(newGame); //otra forma de hacer el dispatch
    };


    return(
        <div className={style.all}>
            <Route render={({history}) => (<button className={style.btn} onClick={() => { history.push('/home') }}>Back 🏠</button>)}/>
            <form className={style.container} onSubmit={submitHandler}>
                <div className={style.inputscontainer}>
                    <label  htmlFor='image'>Image: </label>
                    <input disabled={imageDisabled} className={style.it} type='text' name='image' value={image} onChange={((e) => {setImage(e.target.value||''); SetNameDisabled(false)})}></input>
                    <label htmlFor='name'>Name: </label>
                    <input disabled={nameDisabled} className={style.it} type='text' name='name' value={name} onChange={((e) => {setName(e.target.value||''); SetDescriptionDisabled(false)})}></input>
                    <label htmlFor='description'>Description: </label>
                    <input disabled={descriptionDisabled} className={style.it} type='text' name='description' value={description} onChange={((e) => {setDescription(e.target.value||''); SetReleasedDisabled(false)})}></input>
                    <label htmlFor='released'>Released: (example: 2015-11-11) </label>
                    <input disabled={releasedDisabled} className={style.it} type='text' name='released' value={released} onChange={((e) => {setReleased(e.target.value||''); SetRatingDisabled(false)})}></input>
                    <label htmlFor='rating'>Rating: (number between 0-10)</label>
                    <input disabled={ratingDisabled} className={style.it} type='text' name='rating' value={rating} onChange={((e) => {setRating(e.target.value||'')})}></input>
                </div>
                <div className={style.genrescontainer}>
                <div className={style.buttoncontainer}>{genresDb.map(genre => <button className={style.btngenresplatforms} type='button' name={genre} key={genre} onClick={(e) => {setGenres([...genres,e.target.name])}}>{genre}</button>)}</div>
                    <label htmlFor='genres'>Genres: </label>
                    <ul className={style.list}>
                        {genres.map( g => <li key={g}>{g}</li>)}
                    </ul>
                    <label htmlFor='add'>Add genre: </label>
                    <input className={style.inputtext} type='text' name='add' value={genre} onChange={((e) => {setGenre(e.target.value||'')})}></input>
                    <button className={style.add} type='button' name='add_button' key='add_button' onClick={(e) => {setGenres([...genres,genre]); setGenre('')}}> add</button>
                </div>
                
                <div className={style.platformscontainer}>
                    {platformsConst.map(p => <button className={style.btngenresplatforms} type='button' name={p} key={p} onClick={(e) => {setPlatforms([...platforms, e.target.name])}}>{p}</button>)}
                    <div>
                        <label htmlFor="platforms">Platforms: </label>
                        <ul className={style.list}>
                            {platforms.map(p => <li key={p}>{p}</li>)}
                        </ul>
                    </div>
                    <label htmlFor='add_platforms'>Add platform: </label>
                    <input className={style.inputtext} type='text' name='add_platforms' value={platform} onChange={((e) => {setPlatform(e.target.value||'')})}></input>
                    <button className={style.add} type='button' name='add_button_platform' key='add_button_platform' onClick={(e) => {setPlatforms([...platforms,platform]); setPlatform('')}}> add</button>
                </div>
                {errorMessage && (<p className="error"> {errorMessage} </p>)}
                <button className={style.submit} type='submit' disabled={ratingDisabled}>Submit</button>
            </form>
            <Route render={({history}) => (<button className={style.btn} onClick={() => { history.push('/home') }}>Back 🏠</button>)}/>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return{
        createGame: (game) => dispatch(createGame(game))
    }
}

export default connect(null, mapDispatchToProps)(GameCreation);