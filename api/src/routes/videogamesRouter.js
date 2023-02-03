const { Router } = require('express');

const videogamesRouter = Router();

const {getVideogames} = require('../controllers/videogamesController');
const {postGamesRouter} = require('../controllers/postVideogames');
const {getGameDetail} = require('../controllers/gameDetailController');


videogamesRouter.get('/videogame/:id', getGameDetail);
videogamesRouter.post('/videogame', postGamesRouter);
videogamesRouter.get('/videogames', getVideogames);




module.exports = videogamesRouter;