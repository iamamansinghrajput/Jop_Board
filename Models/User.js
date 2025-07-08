const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
   password: {
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
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;
