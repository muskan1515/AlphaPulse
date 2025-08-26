const User = require('../models/User');

class UserService {
  static findByGoogleId(googleId) {
    return User.findOne({ googleId });
  }

  static findById(id) {
    return User.findById(id);
  }

  static create(data) {
    return User.create(data);
  }
}

module.exports = UserService;
