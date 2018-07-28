const express = require('express');
const {Credit} = require('./../models/credit');
const {authenticate} = require('./../middleware/authenticate');
const {User} = require('./../models/user');
const router = express.Router();

router.post('/users/creditcreate', authenticate, (req, res) => {
  // we have user and token when authenticate completed.
  const _id = req.user._id;
  console.log(_id)
  var credit = new Credit({
    userHolder: _id
  });
  credit.save().then((credit) => {
    var update = {
      "credit": credit._id
    };
    User.findOneAndUpdate({_id}, update, {new: true}).then((user) => {
      // res anything you want (user, credit,...)
       res.status(200).send({credit: user.credit});
    })
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = {router};