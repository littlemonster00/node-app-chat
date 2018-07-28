const mongoose = require('mongoose');
const _ = require('lodash');

var Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
    type: mongoose.Schema.Types.String,
    required: true,
    trim: true,
    minlength: 2
  },
  createdAt: {
    type: mongoose.Schema.Types.Number,
    default: null,
  },
  completed: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  },
  completedAt: {
    type: mongoose.Schema.Types.Number,
    default: null
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

var Todo = mongoose.model('Todo', TodoSchema);
module.exports = {Todo};