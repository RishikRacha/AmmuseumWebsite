const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: [String], required: true },
  difficulty: { type: Number, required: false, min: 1.0, max: 5.0 },
  level: {type: String, required: false, enum: ["Light", "Medium", "Heavy"] },
  playtime: {type: String, required: false},
  more: { type: String },
  description: { type: String, required: true },
  players: {
    min: { type: Number, required: true },
    max: { type: Number, required: false }
  },
  default: {type: Boolean, required: false}
});


const Game = mongoose.model('game', GameSchema);

module.exports = Game;