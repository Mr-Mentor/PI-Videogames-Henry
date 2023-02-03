import axios from 'axios';

export const GET_GAMES = 'GET_GAME';
export const GET_GENRES = 'GET_GENRES';
export const CREATE_GAME = 'CREATE_GAME';
export const GET_NAME = 'GET_NAME';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_ABCUP = 'GET_ABCUP';

const abc_up = (games) => {
     return games.sort((a,b) => {
        if(a.name.toLowerCase() === b.name.toLowerCase()){
            return 0;
        }
        if(a.name.toLowerCase() < b.name.toLowerCase()){
            return -1;
        }
        return 1;
    })
};
const rating = (games) => { 
    return games.sort((a,b) => {
        if(a.rating === b.rating){
            return 0;
        }
        if(a.rating < b.rating){
            return -1;
        }
        return 1;
    }).reverse();
};
const api = (games) => {
    return games.filter( (e) => e.source==='api');
};
const db = (games) => {
    return games.filter( (e) => e.source==='db');
};
export const getGames = () => {
    return function(dispatch) {
        fetch('http://localhost:3001/videogames')
        .then(response => response.json())
        .then(data => dispatch({type: GET_GAMES, payload: data}))
    }
};

export const getGenres = () => {
    return function(dispatch) {
        fetch('http://localhost:3001/genres')
        .then(response => response.json())
        .then(data => dispatch({type: GET_GENRES, payload: data}))
    }
};

export const createGame = (game) => {
    return function(dispatch){
        axios.post('http://localhost:3001/videogame', game)
        .then(response => dispatch({type: CREATE_GAME, payload: response}))
    }
};

export const getGamesByName = (name) => {
    return function(dispatch){
        fetch(`http://localhost:3001/videogames?name=${name}`)
        .then(response => response.json())
        .then(data => dispatch({type: GET_NAME, payload: data}))
    }
};

export const getGameDetail = (id) => {
    return function(dispatch){
        fetch(`http://localhost:3001/videogame/${id}`)
        .then(response => response.json())
        .then(data => dispatch({type: GET_DETAIL, payload: data}))
    }
};

export const getGamesOrderByAbcup = () => {
    return function(dispatch) {
        fetch('http://localhost:3001/videogames')
        .then(response => response.json())
        .then(data => {
            const newData = abc_up(data);
            return dispatch({type: GET_GAMES, payload: newData})
        })
    }
};
export const getGamesOrderByAbcdown = () => {
    return function(dispatch) {
        fetch('http://localhost:3001/videogames')
        .then(response => response.json())
        .then(data => {
            const newData = abc_up(data).reverse();
            return dispatch({type: GET_GAMES, payload: newData})
        })
    }
};
export const getGamesOrderByRating = () => {
    return function(dispatch) {
        fetch('http://localhost:3001/videogames')
        .then(response => response.json())
        .then(data => {
            const newData = rating(data);
            return dispatch({type: GET_GAMES, payload: newData})
        })
    }
};
export const getGamesOrderByApi = () => {
    return function(dispatch) {
        fetch('http://localhost:3001/videogames')
        .then(response => response.json())
        .then(data => {
            const result = api(data);
            return dispatch({type: GET_GAMES, payload: result})
        })
    }
};
export const getGamesOrderByDb = () => {
    return function(dispatch) {
        fetch('http://localhost:3001/videogames')
        .then(response => response.json())
        .then(data => {
            const result = db(data);
            return dispatch({type: GET_GAMES, payload: result})
        })
    }
};
export const getUpAndRating = () => {
    return function(dispatch){
        fetch('http://localhost:3001/videogames')
        .then(response => response.json())
        .then(data => {
            const result = abc_up(rating(data));
            return dispatch({type: GET_GAMES, payload: result})
    })
    }
}