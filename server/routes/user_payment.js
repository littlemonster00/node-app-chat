const express = require('express');
const { ObjectId } = require('mongodb').ObjectId;
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');

const { Credit } = require('./../models/credit');
const { User } = require('./../models/user');
const { authenticate } = require('./../middleware/authenticate');

router.post('/users/payment', authenticate, (req, res) => {

  var queryS = {
    numberCard: req.body.numberSend
  };
  var queryR = {
    numberCard: req.body.numberReceive
  };
  // Increase user's balance
  var updateS = {
    $inc: {
      "balance": recharge * -1
    }
  };
  var updateR = {
    $inc: {
      "balance": recharge
    }
  };
  // Option after update credit
  var option = {
    new: true
  };

  var body = _.pick(req.body, ['amount', 'numberReceive', 'numberSend']);
  // check number send
  // const transaction = new Promise((resolve, reject) => {

    Credit.findOne({ queryR }).then((receive) => {
      Credit.findOneAndUpdate(queryS, updateS, option)
        .populate('userHolder')
        .then((credit) => {
          receive.update(updateR).then(() => {
            res.status(200).send({
              numberReceive, numberSend, amount
            })
          })
        }).catch((err) => {
          res.status(400).send(err);
        });
    })
  });

  // check number reveive


//});
module.exports = { router };