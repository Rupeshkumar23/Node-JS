const express = require('express');
const mongoose = require('mongoose');

const server = express();

mongoose.connect('PUT YOUR MONGO DB URL HERE');

mongoose.connection.on('connected', function () {
  console.log('connected to mongodb');
});

server.use(express.json());

const MovieSchema = new mongoose.Schema({
  name: String,
  year: Number,
  rating: Number,
  director: String,
});
const Movie = mongoose.model('Movie', MovieSchema);

const PokemonSchema = new mongoose.Schema({
  name: String,
  type: String,
  level: Number,
});
const Pokemon = mongoose.model('Pokemon', PokemonSchema);

server.post('/pokemon', async function (req, res) {
  const document = await Pokemon.create(req.body);

  res.send(document);
});

server.get('/pokemon', async function (req, res) {
  const document = await Pokemon.find(req.query);

  res.send(document);
});

server.post('/', async function (req, res) {
  console.log(req.body);

  const movie = await Movie.create(req.body);

  res.json({
    message: 'Movie created successfully',
    data: movie,
  });
});

server.get('/', async function (req, res) {
  console.log(req.query);

  const movies = await Movie.find(req.query);

  res.json({
    message: 'All movies',
    data: movies,
  });
});

server.patch('/', async function (req, res) {
  const id = req.query.id;

  console.log(req.body, id);

  const movie = await Movie.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json({
    message: 'Movie updated successfully',
    data: movie,
  });
});

server.delete('/', async function (req, res) {
  await Movie.findOneAndDelete({
    name: req.body.name,
  });

  res.json({
    message: 'Movie deleted successfully',
  });
});

server.listen(5000, function () {
  console.log('Server is running on port 5000');
});
