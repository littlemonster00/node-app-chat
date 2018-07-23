const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();


const {Todo} = require('./../models/todo');
const {authenticate} = require('./../middleware/authenticate');

router.post('/todos', authenticate, (req, res) => {
   var todo = Todo({
     text: req.body.text,
     creator: req.user._id,
     createdAt: new Date().getTime()
   });
   todo.save().then((todo) => {
     res.status(201).send({todo});
   }).catch((error) => {
     res.status(400).send(error);
   });
});

module.exports = {router};