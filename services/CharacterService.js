const Character = require('../models/CharacterModels');

const getAllChars = async () => {
  const characters = await Character.find();
  return characters;
};

const getById = async (id) => {
  const character = await Character.findById(id);
  return character;
};

const createCharacter = async (name, characterClass, life, attack, defense, speed) => {
  const character = await Character.create({ name, characterClass, life, attack, defense, speed });
  return character;
}

const updateCharacter = async (id, updates) => {
  const updatedCharacter = await Character.findByIdAndUpdate(id, updates, { new: true });
  return updatedCharacter;
};

module.exports = {
  updateCharacter
};


const deleteChararacter = async (id) => {
   await Character.findByIdAndDelete(id)
}

module.exports = {
  getAllChars,
  getById,
  createCharacter,
  updateCharacter,
  deleteChararacter
}
