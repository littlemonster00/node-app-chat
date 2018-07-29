const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditSchema = new Schema({
  numberCard: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  balance: {
    type: mongoose.Schema.Types.Number,
    default: 0
  },
  userHolder: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});
const Credit = mongoose.model('Credit', creditSchema);
module.exports = { Credit };