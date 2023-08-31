import React, { useState, useEffect } from 'react';
import './App.css'
import { getAll, handleSubmitCharacter, updateCharacter, deleteCharacter } from './utils';

function App() {
  const [characters, setCharacters] = useState([]);
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    characterClass: '',
    life: 0,
    attack: 0,
    defense: 0,
    speed: 0
  });
  const [editedCharacterId, setEditedCharacterId] = useState(null);
  const [editedFields, setEditedFields] = useState({
    name: '',
    characterClass: '',
    life: 0,
    attack: 0,
    defense: 0,
    speed: 0
  });

  const handleEdit = (character) => {
    setEditedCharacterId(character._id);
    setEditedFields(character);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  };

  const handleSaveEdit = async (characterId) => {
    try {
      await updateCharacter(characterId, editedFields);
      setCharacters((prevCharacters) =>
        prevCharacters.map((character) =>
          character._id === characterId ? { ...character, ...editedFields } : character
        )
      );
      setEditedCharacterId(null);
      setEditedFields({
        name: '',
        characterClass: '',
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0
      });
    } catch (error) {
      console.error('Error updating character:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditedCharacterId(null);
    setEditedFields({
      name: '',
      characterClass: '',
      life: 0,
      attack: 0,
      defense: 0,
      speed: 0
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleSubmitCharacter(newCharacter, characters, setCharacters, setNewCharacter);
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  };

  const handleDelete = async (characterId) => {
    try {
      await deleteCharacter(characterId); // Substitua pelo método de exclusão adequado
      setCharacters((prevCharacters) =>
        prevCharacters.filter((character) => character._id !== characterId)
      );
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  useEffect(() => {
    getAll(setCharacters);
  }, []);

  return (
    <div>
      <header>
        <h2 className='title'>Api Project</h2>
      </header>
      <form className='camps' onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={newCharacter.name}
            onChange={event => setNewCharacter({ ...newCharacter, name: event.target.value })}
          />
        </label>
        <label>
          Class:
          <input
            type="text"
            value={newCharacter.characterClass}
            onChange={event => setNewCharacter({ ...newCharacter, characterClass: event.target.value })}
          />
        </label>
        <label>
          Life:
          <input
            type="text"
            value={newCharacter.life}
            onChange={event => setNewCharacter({ ...newCharacter, life: event.target.value })}
          />
        </label>
        <label>
          Attack:
          <input
            type="text"
            value={newCharacter.attack}
            onChange={event => setNewCharacter({ ...newCharacter, attack: event.target.value })}
          />
        </label>
        <label>
          Defense:
          <input
            type="text"
            value={newCharacter.defense}
            onChange={event => setNewCharacter({ ...newCharacter, defense: event.target.value })}
          />
        </label>
        <label>
          Speed:
          <input
            type="text"
            value={newCharacter.speed}
            onChange={event => setNewCharacter({ ...newCharacter, speed: event.target.value })}
          />
        </label>
        <button type="submit">Adicionar</button>
      </form>

      <h1>Lista de Personagens</h1>

      <ul>
        {characters.map((character) => (
          <li key={character._id}>
            {character.name} - {character.characterClass} - 
            {character.life} {character.attack} {character.defense} {character.speed}
            <button onClick={() => handleEdit(character)}>Editar</button>
            <button onClick={() => handleDelete(character._id)}>Excluir</button>
            {editedCharacterId === character._id && (
              <div>
                <label>Name: <input type="text" value={editedFields.name} onChange={handleEditChange} name="name" /></label>
                <label>Character Class: <input type="text" value={editedFields.characterClass} onChange={handleEditChange} name="characterClass" /></label>
                <label>Life: <input type="text" value={editedFields.life} onChange={handleEditChange} name="life" /></label>
                <label>Attack: <input type="text" value={editedFields.attack} onChange={handleEditChange} name="attack" /></label>
                <label>Defense: <input type="text" value={editedFields.defense} onChange={handleEditChange} name="defense" /></label>
                <label>Speed: <input type="text" value={editedFields.speed} onChange={handleEditChange} name="speed" /></label>
                <button onClick={() => handleSaveEdit(character._id)}>Salvar</button>
                <button onClick={handleCancelEdit}>Cancelar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;