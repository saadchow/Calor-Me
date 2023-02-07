const Calorie = require('../models/calorie');

function newMeal(req, res, next) {
  res.render('calories/new');
}

function index(req, res, next) {
  Calorie.find({}, function (err, calories) {
    if (err) {
      console.log(err);
      res.redirect('/');
    }

    res.render('calories/index', {calories});
  });
}

function create(req, res) {
  
  const meal = new Calorie(req.body);
  meal.save (function(err, newCalorie) {
    if (err) {
      console.error(err); 
      return res.render('/calories/new');
    }
    console.log(newCalorie);
    res.redirect('/calories/new');
  });
}


module.exports = {
  new: newMeal,
  create: create,
  index: index,
};

