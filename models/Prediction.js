const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
//   name: {
//     type: string,
//     required: true,
//   },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  caffeine: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  pregnant: {
    type: String,
    required: true,
  },
  health: {
    type: String,
    required: true,
  },
  per_day: {
    type: Number,
    required: true,
  },
  today: {
    type: Number,
    required: true,
  },
  prediction: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Prediction', PredictionSchema);
