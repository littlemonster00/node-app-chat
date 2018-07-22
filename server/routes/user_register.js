const express = require('express');
const router = express.Router();

const {User} = require('./../models/user');

router.post('/users', (req, res) => {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  user.save().then((user) => {
    return user.generateAuthToken(); // return the Promise.
  }).then((token) => {
    res.header('x-auth', token).send(user.toJSON());
  }).catch((error) => {
    console.log(error.toString());
    res.status(400).send(error);
  });
});

module.exports = {router};