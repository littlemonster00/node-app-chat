const express = require('express');
const { Credit } = require('./../models/credit');
const { authenticate } = require('./../middleware/authenticate');
const { User } = require('./../models/user');
const router = express.Router();

router.post('/users/creditcreate', authenticate, (req, res) => {
  // we have user and token when authenticate completed.
  const _id = req.user._id;
  var credit = new Credit({
    numberCard: req.body.numberCard,
    userHolder: _id
  });
  // save credit card append credit card into user.credits array
  credit.save().then((credit) => {
    User.findById(_id)
      .then((user) => {
        return user.appendCredit(credit._id); // return promise save() of mongoose
      })
      .then((user) => {
        res.send(user.credits);
      })
  }).catch((err) => { // catch all of error saving
    res.status(400).send(err);
  });
});

module.exports = { router };