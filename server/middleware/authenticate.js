const {User} = require('./../models/user');

const authenticate =  (req, res, next) => {
  var token = req.header('x-auth'); // take token from client
  // Find token into DB
  User.findByToken(token).then((user) => {
   if(!user) {
     return Promise.reject('User not exist with that token');
   }
   // identifying user information
   req.user = user;
   req.token = token;
   next();
  }).catch((error) => {
    return res.status(400).send(error);
  });
}

module.exports = {authenticate};