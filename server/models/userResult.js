const mongoose = require('mongoose');
// const Joi = require('joi');
const userResultSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
title:{
    type: String,
    required: true,
},
subject:{
    type: String,
    required: true,
},
  marks: {
    type: Number,
    required:true,
    default:0
  },
});
 

const UserResult = mongoose.model('UserResult', userResultSchema);

exports.UserResult = UserResult; 
