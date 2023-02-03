import { CREATE_GAME, GET_GAMES, GET_GENRES, GET_NAME, GET_DETAIL } from "./actions";

const initialState = {
    games: [],
    genres: [],
    createdGame: [],
    gameDetail: {},
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_GAMES:
            return{
                ...state,
                games: action.payload,
            };
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload,
            };
        case CREATE_GAME:
            return{
                ...state,
                createdGame: action.payload,
            };
        case GET_NAME:
            return{
                ...state,
                games: action.payload,
            };
        case GET_DETAIL:
                return{
                    ...state,
                    gameDetail: action.payload,
                };
        default:
            return{...state};
    }
};

export default rootReducer;