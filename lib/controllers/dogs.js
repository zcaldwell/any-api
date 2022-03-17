const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
  .post('/', async (req, res) => {
    const dog = await Dog.insert(req.body);
    res.json(dog);
  })

  .get('/:id', async (req, res) => {
    const dog = await Dog.findById(req.params.id);
    res.send(dog);
  })

  .get('/', async (req, res) => {
    const dog = await Dog.findAll();
    res.send(dog);
  });
