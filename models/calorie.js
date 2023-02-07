const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const daySchema = new Schema ({
  currentDate: String,
}, {
  timestamps: true 
})

const calorieSchema = new Schema({
  nameOfMeal: String, 
  mealNumber: Number,
  totalCalories: Number,
  protein: Number,
  carbohydrates: Number,
  fats: Number,
});

module.exports = mongoose.model('calorie', calorieSchema);
