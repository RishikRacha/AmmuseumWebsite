const express = require('express');
const router = express.Router();
// const Game = require('../model/gameSchema')    //model

const { recommendGames } = require("../services/recommendationService")

router.post("/get-recommendations", async (req, res) => {

    try {
        const {query, players} = req.body;

        if (!query || !players) {
            return res.status(400).json({ message: "query and players are required" });
        }

        const results = await recommendGames({query, players});

        res.json(results);
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Recommendation Service Failed"
        })
    }

})


module.exports = router;