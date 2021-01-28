const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  name: String,
  surrname: String,
  email: String,
  password: String,
  credits: {
    type: Number,
    default: 3,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  newUser: {
    type: Boolean,
    default: true,
  },
  resetToken: String,
  expireToken: Date,
  confirmedAccount: {
    type: Boolean,
    default: false,
  },
  confirmedAccountToken: String,
});

module.exports = mongoose.model('User', UserSchema);
