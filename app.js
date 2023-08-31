const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('../models/connection');
const Character = require('../../src/controllers/CharacterController');

app.use(express.json());
app.use(cors());

app.get('/get_all', Character.getAllChars);
app.get('/get_by_id/:id', Character.getById);
app.post('/create_character', Character.createCharacter);
app.patch('/update_character/:id', Character.updateCharacter);
app.delete('/delete/:id', Character.deleteChararacter);

connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
  });
});
