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
  var byNumberCard = {
    _id: req.user._id,
    numberCard: req.body.numberCard
  }
    // Update balance for user's card number.
    Credit.findOneAndUpdate({numberCard: req.body.numberCard}, update, option)
    .populate('userHolder')
    .then((credit) => {
      if(!credit) {
        return res.status(400).send({message: 'Can not founn credit'});
      }
      res.status(200).send(credit)
    }).catch((err) => {
      res.status(400).send(err);
    });
  })

module.exports = { router };