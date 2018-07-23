const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {User} = require('./../models/user');
const {Todo} = require('./../models/todo');
const {authenticate} = require('./../middleware/authenticate');

router.get('/todos', authenticate, (req, res) => {

  Todo.find({
    creator : req.user._id
  }).then((todos) => {
    if(!todos) {
      res.status(400).send('Todo can not found');
    }
    res.send({todos});
  }).catch((error) => {
    res.status(400).send(error);
  })
});

module.exports = {router};