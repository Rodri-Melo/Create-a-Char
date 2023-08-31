const Character = require('../services/CharacterService');

const getAllChars = async (req, res) => {
  try {
    const characters = await Character.getAllChars();
    res.send({ characters });
  } catch (err) {
    res.status(400).send(err);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;

    const character = await Character.getById(id);
    res.send({ character });
  } catch (error) {
    res.status(400).send('Esse id não está cadastrado');
  }
}

const createCharacter = async (req, res) => {
  try {
    const { name, characterClass, life, attack, defense, speed } = req.body;
    const character = await Character.createCharacter(name, characterClass, life, attack, defense, speed);
    res.send(character);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateCharacter = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, characterClass, life, attack, defense, speed } = req.body;
    const updates = { name, characterClass, life, attack, defense, speed };
    const updatedCharacter = await Character.updateCharacter(id, updates);

    res.send({ message: 'Atualizado com sucesso', character: updatedCharacter });
  } catch (error) {
    res.status(400).send('Erro ao atualizar o personagem');
  }
};

const deleteChararacter = async (req, res) => {
  try {
    const characterId = req.params.id;
    await Character.deleteChararacter(characterId);

    res.send({ message: 'Deletado com sucesso' });
  } catch (error) {
    res.status(400).send('Erro ao deletar o post');
  }
}

module.exports = {
  getAllChars,
  getById,
  createCharacter,
  updateCharacter,
  deleteChararacter
}
