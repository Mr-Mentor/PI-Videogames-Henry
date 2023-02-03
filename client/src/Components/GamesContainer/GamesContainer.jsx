import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getGames, getGenres } from "../../redux/actions";
import Game from "../Game/Game";
import style from './GamesContainer.module.css';
import { Route } from "react-router-dom";

const GamesContainer = () => {

    const games = useSelector((state) => state.games);
    const dispatch = useDispatch();

    useEffect(()=> {dispatch(getGames())},[]);

    const genres = useSelector((state) => state.genres);

    useEffect(() => {dispatch(getGenres())},[]);
    
    const pages = Math.round(((games.length - 9) / 15));


    const [items, setItems] = useState([...games].splice(0, 9));
    const [currentPage, setCurrentPage] = useState(1);
    const [api, setApi] = useState(false);
    const [db, setDb] = useState(false);
    const [value, setValue] = useState('Filter genre:');

    useEffect(() => {if(games){
        setItems([...games].splice(0, currentPage===1?9:15));
    }},[games])
    

    

    const nextHandler = () => {
        const totalElementos = games.length;
        const nextPage = currentPage + 1;
        let firstIndex = null;
        if(currentPage === 1){
            firstIndex = 9;
        }else{
            firstIndex = nextPage * (nextPage===2?9:15);
        }
        if(firstIndex >= totalElementos) return;
        setCurrentPage(nextPage);

        setItems([...games].splice(firstIndex, nextPage===1?9:15));
    };
    const prevHandler = () => {
        const prevPage = currentPage - 1;
        let firstIndex = 0;
        if(prevPage < 1) return;
        if(prevPage === 1){
            firstIndex = 0;
        }else{
            firstIndex = prevPage * (prevPage===1?9:15);
        }
        
        setItems([...games].splice(firstIndex, prevPage===1?9:15));
        setCurrentPage(prevPage);
    }

    const apiHandle = () => {
        setApi(!api);
        setDb(false);
    };
    const dbHandle = () => {
        setDb(!db);
        setApi(false);
    };
    const genreHandle = (e) => {
        setValue(e.target.value)
        if(e.target.value==='Filter genre:'){
            setItems([...games].splice(0, currentPage===1?9:15));
        }else{
            let g =[];
            for(let i=0; i< games.length; i++){
                for(let x=0; x < games[i].genres.length; x++){
                    if(games[i].genres[x].name===e.target.value) g.push(games[i]);
                }
            }
            setItems(g);
            //setItems([...g].splice(0, currentPage===1?9:15));
        }
    }
    return(
        <div className={style.container} key='div1'>
            <Route render={({history}) => (<button className={style.btn} onClick={() => { dispatch(getGames())}}>Home 🏠</button>)}/>
                    <div className={style.checks} key='div2'>
                        <div key='div3'>
                            <label className={style.check} key='existing_game'>
                                <input key='existing_game_input' type='checkbox'  onChange={apiHandle}/>
                                Existing game
                            </label>
                        </div>
                        <div key='div4'>
                            <label className={style.check} key='created_game'>
                                <input key='created_game_input' type='checkbox' checked={db} onChange={dbHandle}/>
                                Created game
                            </label>
                        </div>
                    </div>
                    <select key='dropdown' value={value} onChange={genreHandle} className={style.dropdown}>
                        <option key='dropdown_first'>Filter genre:</option>
                        {genres.map(genre => <option key={genre} className={style.dropdown} value={genre}>{genre}</option>)}
                    </select>
            <div key='card' className={style.cards}>
                {
                    items?.map( game => {
                        if(api){
                            if(game.source==='api'){
                                return(
                                <Game
                                    name={game.name}
                                    image={game.image}
                                    genres={game.genres}
                                    id={game.id}
                                    key={game.name}
                                />
                            )
                            }
                        }
                        if(db){
                            if(game.source==='db'){
                                return(
                                <Game
                                    name={game.name}
                                    image={game.image}
                                    genres={game.genres}
                                    id={game.id}
                                    key={game.name}
                                />
                            )
                            }
                        }
                        if(!db&&!api){
                                return(
                                <Game
                                    name={game.name}
                                    image={game.image}
                                    genres={game.genres}
                                    id={game.id}
                                    key={game.name}
                                />
                            )
                        }
                        
                    })
                }   
            </div>
            <div key='current_page' className={style.currentpage}>
                Current page: {currentPage}
            </div>
            {currentPage!==1&&<button key='prev' onClick={prevHandler} className={style.pagebtn}>prev</button>}
            {currentPage!==pages&&<button key='next' onClick={nextHandler} className={style.pagebtn}>next</button>}
        </div>
    )
};

export default GamesContainer;