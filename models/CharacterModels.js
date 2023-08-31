const mongoose = require('../db/db');

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  characterClass: {
    type: String,
    required: true,
  },
  life: {
    type: Number,
    required: true,
  },
  attack: {
    type: Number,
    required: true,
  },
  defense: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
});

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;
