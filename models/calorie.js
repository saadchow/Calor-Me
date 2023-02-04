const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calorieSchema = new Schema({
  nameOfMeal: String, 
  mealNumber: Number,
  totalCalories: Number,
  protein: Number,
  carbohydrates: Number,
  fats: Number,
});

module.exports = mongoose.model('calorie', calorieSchema);

