const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
userName: {
    type: String,
    required: true,
    unique: true,
  },
title   : {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category :{
    type: String,
    required: true
  },
  description :{
   type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const job = mongoose.model('Job', jobSchema);
module.exports = job;
