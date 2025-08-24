const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  specialization: {
    type: String,
    required: true
  },
  image:{
    type: String
  },
  hospital: {
    type: String,
    required: true
  },
  password: { // Add password field for authentication
    type: String,
    required: true
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
});

module.exports = mongoose.model('Doctor', doctorSchema);