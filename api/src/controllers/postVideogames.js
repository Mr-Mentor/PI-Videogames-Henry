const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const { addGenres, firsTimeGenres } = require('../utils');

const postGamesRouter = Router();

postGamesRouter.post('/videogame', async (req, res) => {
    try {
        await firsTimeGenres();
        let {image, name, description, released, rating, genres, platforms} = req.body;
        const game = await Videogame.findOne({where:{name: name.toLowerCase()}});
        if(!game){
            const ids = await addGenres(genres);
            const source = 'db';
            name = name.toLowerCase();
            const newGame = await Videogame.create({image, name, description, released, rating, platforms, source});
            await newGame.setGenres(ids);
            res.status(200).json(newGame);
        }else{
            res.status(200).json('This game already exists');
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = {postGamesRouter};