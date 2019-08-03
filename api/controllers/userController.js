'use strict'

var mongoose = require('mongoose'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcrypt'),
User = mongoose.model('User')

exports.register = function(req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};

exports.sign_in = function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.password)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')});
      }
    }
  });
};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

exports.get_my_links = function(req, res) {
  console.log('REQ -----', req.user._id)
  User.findById(req.user._id, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};
// not finished
/* exports.update_state = function(req, res) {
  User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
}; */
exports.update_state = function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err)
      res.send(err);
    console.log('REQ.USER.STATE', req.body.state)  
    user.state = req.body.state
    user.save(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.state = req.body.state;
        return res.json(user);
      }
    });
    //res.json(user);
  });
};

