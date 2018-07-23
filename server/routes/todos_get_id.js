const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {User} = require('./../models/user');
const {Todo} = require('./../models/todo');
const {authenticate} = require('./../middleware/authenticate');

router.get('/todos/:id', authenticate, (req, res) => {
  Todo.findById(req.params.id).then((todo) => {
    if(!todo) {
      return res.status(400).send('Can not found todo by id');
    }
    res.status(200).send({todo});
  }).catch((error) => {
    res.status(400).send(error);
  });
});

module.exports = {router};