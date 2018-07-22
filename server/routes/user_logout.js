const express = require('express');
const _ = require('lodash');
const router = express.Router();

const {User} = require('./../models/user');
const {authenticate} = require('./../middleware/authenticate');

router.delete('/users/me/token', authenticate, (req, res) => {
   req.user.removeToken(req.token).then(() => {
     res.status(200).send();
   }).catch((error) => {
     res.status(400).send();
   });
});

module.exports = {router};