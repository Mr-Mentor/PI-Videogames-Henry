require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db');
const { default: axios, all } = require('axios');
const { Op } = require("sequelize");

const getApiGames = async () => {
    const promise1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=25`);
    const promise2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=25`);
    const promise3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=25`);
    const promise4 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4&page_size=25`);

    const games = await Promise.all([promise1, promise2, promise3, promise4])
    .then( p => {
        return [...p[0].data.results, ...p[1].data.results, ...p[2].data.results, ...p[3].data.results];
    })

    const cleanGames = games.map( game => {
        return{
            id: game.id,
            image: game.background_image,
            name: game.name,
            genres: game.genres,
            rating: game.rating,
            source: 'api',
        }
    })
    return cleanGames;
};

const getDbGames = async () => {
    const games = await Videogame.findAll({attributes:['id','image','name','rating','source'],include:[{model: Genre}]});
    return games;
};

const getAllGames = async () => {
    const apiGames = await getApiGames();
    const dbGames = await getDbGames();
    return [...dbGames, ...apiGames];
};

const addGenres = async (genres) => {
    let ids = [];
    if(genres.length){
        let newGenres = genres.map( g => {
            return{
                name: g,
            }
        })
        for(i=0; i < genres.length; i++){
            let [row, created] = await Genre.findOrCreate({where: newGenres[i]})
            ids.push(row.dataValues.id);
        }
        let result = ids.filter((item, index) => {
            return ids.indexOf(item) === index;
        })
        console.log(result);
        return result;
    }
};

const firsTimeGenres = async () => {
    const dbGenres = await Genre.findAll();
    if(!dbGenres.length){
        const genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const objGenres = genres.data.results.map(g => {
        return{
            name: g.name
        }
    })
    
    await Genre.bulkCreate(objGenres);
    const cleanGenres = genres.data.results.map( g => {
        return g.name;
    })
    return cleanGenres;
    };
    return cleanDbGenres = dbGenres.map(g => g.dataValues.name)
};

const getByNameDb = async (name) => {
    const dbGames = await Videogame.findAll({where:{name:{[Op.like]: `%${name}%`}}, include:[{model: Genre}]})
    return dbGames;
};

const getByNameApi = async (name) => {
    const apiGames = await getApiGames();
    const games = apiGames.filter( g => g.name.toLowerCase().includes(name));
    return games;
}

const getAllByName = async (name) => {
    const cleanName = name.toLowerCase();
    const dbGames = await getByNameDb(cleanName);
    const apiGames = await getByNameApi(cleanName);
    const games = [...dbGames, ...apiGames];
    if(games.length <= 15){
        return games;
    }else{
        return games.slice(0, 16);
    }
};

const getDetailDb = async (id) => {
    const game = await Videogame.findByPk(id, {include:[{model: Genre, attributes:['id', 'name']}]});
    return game;
};

const getDetailApi = async (id) => {
    const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    return {
        id: game.data.id,
        image: game.data.background_image,
        name: game.data.name,
        description: game.data.description,
        released: game.data.released,
        rating: game.data.rating,
        genres: game.data.genres,
        platforms: game.data.platforms,
    }
};

const getAllDetail = async (id) => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    let game = [];
    regexExp.test(id) ? game = await getDetailDb(id) : game = await getDetailApi(id);
    return game;
};


module.exports = {getAllGames, addGenres, firsTimeGenres, getAllByName, getAllDetail};