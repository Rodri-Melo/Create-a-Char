export const getAll = (setCharacters) => {
  fetch('http://localhost:5000/get_all')
    .then(response => response.json())
    .then(data => setCharacters(data.characters))
    .catch(error => console.error('Error fetching data:', error));
};

export const createCharacter = async (newCharacter) => {
  try {
    const response = await fetch('http://localhost:5000/create_character', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCharacter)
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating character:', error);
    throw error;
  }
};

export const handleSubmitCharacter = async (newCharacter, characters, setCharacters, setNewCharacter) => {
  try {
    const data = await createCharacter(newCharacter);
    setCharacters([...characters, data]);
    setNewCharacter({
      name: '',
      characterClass: '',
      life: 0,
      attack: 0,
      defense: 0,
      speed: 0
    });
  } catch (error) {
    console.error('Error handling submit:', error);
    throw error;
  }
};

export const updateCharacter = async (id, updates) => {
  try {
    const response = await fetch(`http://localhost:5000/update_character/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating character:', error);
    throw error;
  }
};

export const deleteCharacter = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    });

    if (!response.ok) {
      throw new Error('Failed to delete character');
    }

  } catch (error) {
    console.error('Error deleting character:', error);
    throw error;
  }
}
