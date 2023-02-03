const { Router } = require('express');

const genresRouter = Router();

const { getGenres } = require('../controllers/genresController');

genresRouter.get('/', getGenres);

module.exports = genresRouter;