const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {User} = require('./../models/user');
const {Todo} = require('./../models/todo');
const {authenticate} = require('./../middleware/authenticate');

router.patch('/todos/:id', authenticate, (req, res) => {
  var update = {
    completed: true,
    completedAt: new Date().getTime()
  };
  Todo.findOneAndUpdate({_id: req.params.id}, update, {new: true})
  .then((todo) => {
    res.status(200).send(todo);
  });
});

module.exports = {router};