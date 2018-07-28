const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditSchema = new Schema({
  userHolder: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  balance: {
    type: mongoose.Schema.Types.Number,
    default: 0
  }
});
const Credit = mongoose.model('Credit', creditSchema);
module.exports = {Credit};