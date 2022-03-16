const { Router } = require('express');
const Dog = require('../models/Dog');

const dogs = [
  { id: 1, name: 'Tom', age: 4 },
  { id: 2, name: 'Hank', age: 3 },
];

module.exports = Router()
  .post('/', async (req, res) => {
    const dog = await Dog.insert(req.body);
    res.json(dog);
  })

  .get('/', async (req, res) => {
    const dogs = await Dog.findAll();
    res.send(dogs);
  });
