const express = require('express');
const { authenticate } = require('./../middleware/authenticate');
const { User } = require('./../models/user');
const {Credit} = require('./../models/credit');
const router = express.Router();

// const bodyParser = require('body-parser');

// router.use(bodyParser.urlencoded({extended: false})); /* using for form */
// router.use(bodyParser.json()); /* applicaton/json */

router.post('/users/creditcreate', authenticate, (req, res) => {
  // we have user and token when authenticate completed.
  const user = req.user;
  const _id = req.user._id;
  var credit = new Credit({
    numberCard: req.body.numberCard,
    userHolder: user._id
  });
  
  credit.save().then((credit) => {
    user.appendCredit(credit).then((user) => {
      if(!user) {
        return res.status(400).send();
      }
      res.status(200).send(user);
    })
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = { router };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    