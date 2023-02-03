const {getAllDetail} = require('../utils');

const getGameDetail = async (req, res) => {
    try {
        const {id} = req.params;
        const game = await getAllDetail(id);
        res.status(200).json(game);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = {getGameDetail};