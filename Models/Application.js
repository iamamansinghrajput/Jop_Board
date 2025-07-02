const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  jobId: { 
      type: String,
        required: true },
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  qualification: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


const application = mongoose.models.User || mongoose.model('Application', applicationSchema);
module.exports = application;
