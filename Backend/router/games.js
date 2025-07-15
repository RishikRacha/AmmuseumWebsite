const express = require('express');
const route = express.Router();

const Game = require('../model/gameSchema')    //model

        //get all games         http://localhost:6969/api/games/get-all-games
route.get('/get-all-games', (req,res)=>{
    Game.find()
        .then((data)=>{
            if(data) {
                const trimmed = data.map(game => ({
                    _id : game._id,
                    name: game.name,
                    image: game.image,
                    level: game.level,
                    players: game.players,
                    default: game.default
                }))
                res.send({ok: true, length: data.length, result: trimmed});
            }
            else throw new Error("could not fetch games")})
        .catch(err=>{res.send({ok: false, error: err})})
})


        //get one game          http://localhost:6969/api/games/get-one-game?id=6865057ad1a03051c9f92af7
route.get('/get-one-game', (req,res)=>{
    const gameId = req.query.id
    
    Game.findById(gameId)
        .then(data => {
            if(data){res.send({ok: true, result: data});} 
            else throw new Error("Could not find game: "+gameId)})
        .catch(err => res.send({ok: false, error: err}))
})


        //get defaults.         http://localhost:6969/api/games/get-defaults
route.get('/get-defaults', (req,res)=>{
    Game.find({default: true})
        .then((data)=>{
            if(data) res.send({ok: true, length: data.length, result: data})
            else throw new Error("could not fetch games")})
        .catch(err=>{res.send({ok: false, error: err})})
})

        //get level light.         http://localhost:6969/api/games/get-light
route.get('/get-light', (req, res)=>{
    Game.find({level: "Light"})
        .then(data => {
            if(data) res.send({ok: true, length: data.length, result: data})
            else {throw new Error("Error fetching Light Games")}})
        .catch(err => {res.send({ok: false, error: err})})

})

        //get level medium.         http://localhost:6969/api/games/get-medium
route.get('/get-medium', (req, res)=>{
    Game.find({level: "Medium"})
        .then(data => {
            res.send({ok: true, length: data.length, result: data})
        })
        .catch(err => {res.send({ok: false, error: err})});

})

        //get level heavy.         http://localhost:6969/api/games/get-heavy
route.get('/get-heavy', (req, res)=>{
    Game.find({level: "Heavy"})
        .then(data => {
            res.send({ok: true, length: data.length, result: data})
        })
        .catch(err => {res.send({ok: false, error: err})});
});

// route.post('/insert-many', (req, res) => {
//     Game.insertMany((req.body))      .then(data => res.send({ok: true, result: "Inserted Successfully"}))    .catch(err => res.send({ok: false, error: err}))
// })





module.exports = route;