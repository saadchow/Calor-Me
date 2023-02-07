const mongoose = require('mongoose')


const mealSchema = new mongoose.Schema({
  totalCalories: Number,
  protein: Number,
  carbohydrates: Number,
  fats: Number,
});

const DaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  
  user: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  meals: [mealSchema],
})

module.exports = mongoose.model('Day', DaySchema)