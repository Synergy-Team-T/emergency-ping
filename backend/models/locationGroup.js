const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const locationGroupSchema = Schema({
  code: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  region: {
    type: String,
  },
  province: {
    type: String,
    required: true,
  },
  municipality: {
    type: String,
    required: true,
  },
}, { timestamps: true });


module.exports = mongoose.model('LocationGroup', locationGroupSchema);
