const { getAllGames, firsTimeGenres, getAllByName} = require('../utils/index')

  const getVideogames = async(req, res) => {
    const {name} = req.query;
    try {
      if(name){
        res.status(200).json( await getAllByName(name));
      }else{
        await firsTimeGenres();
        const games = await getAllGames();
        res.status(200).json(games);
      }  
    } catch (error) {
        res.status(400).json(error.message);
    }
  };


  module.exports = {getVideogames};