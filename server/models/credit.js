const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {User} = require('./user');

const creditSchema = new Schema({
  userHolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  numberCard: {
    unique: true,
    type: mongoose.Schema.Types.String,
    required: true
  },
  balance: {
    type: mongoose.Schema.Types.Number,
    default: 0
  },
  transaction: [{
    send: [{
      amount: {
        type: mongoose.Schema.Types.Number
      },
      time: {
        type: mongoose.Schema.Types.Number
      },
      receiver: {
        type: mongoose.Schema.Types.Number
      }
    }],
    retrieve: [{
      amount: {
        type: mongoose.Schema.Types.Number
      },
      time: {
        type: mongoose.Schema.Types.Number
      },
      sender: {
        type: mongoose.Schema.Types.Number
      }
    }]
  }]
});
const Credit = mongoose.model('Credit', creditSchema);
module.exports = { Credit };