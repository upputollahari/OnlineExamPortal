const mongoose = require('mongoose');
// const Joi = require('joi');
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});
 

const User = mongoose.model('User', userSchema);

exports.User = User; 
