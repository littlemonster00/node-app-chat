const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: mongoose.Schema.Types.String,
    unique: true,
    trim: true,
    minlength: 4,
    required: true
  },
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a email'
    }
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  tokens: [{
    access: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    token: {
      type: mongoose.Schema.Types.String,
      required: true
    }
  }]
});

// Transforms data to response client
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'username'])
}
// Generate authentication tokens
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, '123abc').toString();
  user.tokens.push({access, token});
  // return new Promise
  return user.save().then(() => {
    return token;
  });
}

// Export Model mongoose
var User = mongoose.model('User', UserSchema);
module.exports = {User};