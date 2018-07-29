const express = require('express');
const { ObjectId } = require('mongodb').ObjectId;
const router = express.Router();
const mongoose = require('mongoose');

const { Credit } = require('./../models/credit');
const { User } = require('./../models/user');
const { authenticate } = require('./../middleware/authenticate');

router.post('/users/recharge', authenticate, (req, res) => {
  // Amount of money user want to recharge
  var recharge = req.body.recharge;

  // Search by credit into credits arrays of user
  // A number card provided by users
  var query = {
    numberCard: req.body.numberCard
  };
  // Increase user's balance
  var update = {
    $inc: {
      "balance": recharge
    }
  };
  // Option after update credit
  var option = {
    new: true
  };
  // Find by numberCar provided by user
  Credit.findOne(query).then((credit) => {
    //console.log(credit)
    // Check this credit for this account number
    User.findByCredit(credit._id).then((user) => {
      if (user[0]._id.toHexString() === req.user._id.toHexString()) {

        // Update balance for user's card number.
        Credit.findByIdAndUpdate(credit._id, update, option).then((credit) => {
          // Send object include userholder and balance after update balance
          var recharge = {
            userHolder: req.user._id,
            balance: credit.balance,
            numberCard: credit.numberCard
          }
          res.status(200).send(recharge);
        });
      } else {
        res.status(400).send({
          message: 'Uncorrect number card'
        });
      }
    });
  }).catch((err) => {
    res.status(400).send(err)
  });
});

module.exports = { router };