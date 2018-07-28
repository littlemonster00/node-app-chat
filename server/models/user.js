const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  }],
  credit: {
    type: mongoose.Schema.Types.ObjectId
  }
});

// Transforms data to response client
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email'])
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
//Hashing password before it would be save
UserSchema.pre('save', function(next) {
  var user = this;
  if(user.isModified('password') || user.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) {
          return next(err);
        }
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});
// Find by credentials (email, password)
UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;
  return User.findOne({email}).then((user) => {
    if(!user) {
      return Promise.reject('User can not found');
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          resolve(user);
        } else {
          reject('Incorrect password');
        }
      });
    });
  });
} 

// Find by token
UserSchema.statics.findByToken = function (token) {
   var User = this;
   var decoded;
   try {
     decoded = jwt.verify(token, '123abc');
   } catch (error) {
     return Promise.reject('Token is not valid');
   }
   return User.findOne({
     '_id': decoded._id,
     'tokens.token': token,
     'tokens.access': 'auth'
   })
}

// Remove token
UserSchema.methods.removeToken = function (token) {
  var user = this;
  return user.update({
    $pull: {
      tokens: {token}
    }
  });
}
// Export Model mongoose
var User = mongoose.model('User', UserSchema);
module.exports = {User};