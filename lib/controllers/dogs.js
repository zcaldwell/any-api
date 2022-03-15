const { Router } = require('express');
const Order = require('../models/Order');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const order = await Order.insert(req.body);
  res.json(order);
});
