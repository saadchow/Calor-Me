const mongoose = require('mongoose')


const WeightSchema = new mongoose.Schema({
     user: {
    type: String,
    required: true,
    trim: true,
  },
  totalWeight: Number,
});

module.exports = mongoose.model('Weight', WeightSchema)