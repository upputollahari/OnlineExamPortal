const mongoose = require('mongoose');
// const Joi = require('joi');
const adminSchema = new mongoose.Schema({
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
 

const admin = mongoose.model('admindetails', adminSchema);

exports.Admin = admin; 
