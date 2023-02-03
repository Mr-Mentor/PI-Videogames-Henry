const { firsTimeGenres } = require('../utils');

const getGenres = async (req, res) => {
    try {
        const genres = await firsTimeGenres();
        res.status(200).json(genres);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = {getGenres};
