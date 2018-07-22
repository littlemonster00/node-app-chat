const express = require('express');
const _ = require('lodash');
const {User} = require('./../models/user');
const router = express.Router();

router.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((erro) => {
    res.status(400).send({
      message: erro
    });
  });
});

module.exports = {router};