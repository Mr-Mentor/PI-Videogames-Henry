import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route } from 'react-router-dom';
import { getGamesByName, getGamesOrderByAbcup, getGames, getGamesOrderByAbcdown, getGamesOrderByRating } from "../../redux/actions";
import style from './SearchBar.module.css'

const SearchBar = () => {

    const [byname, setByname] = useState('')
    const dispatch = useDispatch();
    const [abcup, setAbcup] = useState(false);  
    const [abcdown, setAbcdown] = useState(false);
    const [rating, setRating] = useState(false);

    useEffect(()=> {if(abcup === true){
        dispatch(getGamesOrderByAbcup())
    }else{
        dispatch(getGames())
    }},[abcup, dispatch]);

    useEffect(()=> {if(abcdown === true){
        dispatch(getGamesOrderByAbcdown())
    }else{
        dispatch(getGames())
    }},[abcdown, dispatch]);

    useEffect(()=> {if(rating === true){
        dispatch(getGamesOrderByRating())
    }else{
        dispatch(getGames())
    }},[dispatch, rating]);


    const handleAbcUp = () => {
        setAbcup(!abcup);
        if(!abcup){
            setAbcdown(false);
            setRating(false);
        }
        
    };
    const handleAbcDown = () => {
        setAbcdown(!abcdown); 
        if(!abcdown){
            setAbcup(false);
            setRating(false);
        }
    };
    const handleRating = () => {
        setRating(!rating);
        if(!rating){
            setAbcdown(false);
            setAbcup(false);
        }
    };
    const inputHandle = (e) => {
        e.preventDefault();
        setByname(e.target.value||'');
    };
    const buttonHandle = (e) => {
        e.preventDefault();
        dispatch(getGamesByName(byname));
        setByname('')
    };



    return(
        <div className={style.all}>
            <div>
                <div className={style.searchandcreate}>
                    <span>
                        <label htmlFor='search'>Search: </label>
                        <input className={style.it} type='text' name='search' value={byname} onChange={inputHandle}></input>
                        <button className={style.btn} onClick={buttonHandle}>GO!</button>
                    </span>
                    <Route render={({history}) => (<button className={style.btn} onClick={() => { history.push('/creation') }}>CREATE GAME</button>)}/>
                </div>
                <div className={style.checks}>
                    <div>
                        <label className={style.check}>
                            <input type='checkbox' checked={abcup} onChange={handleAbcUp}/>
                            ABC ↑
                        </label>
                    </div>
                    <div>
                        <label className={style.check}>
                            <input type='checkbox' checked={abcdown} onChange={handleAbcDown}/>
                            ABC ↓
                        </label>
                    </div>
                    <div>
                        <label className={style.check}>
                            <input type='checkbox' checked={rating} onChange={handleRating}/>
                            Rating
                        </label>
                    </div>
                    
                </div>
            </div>
        </div>
    )
};

export default SearchBar;