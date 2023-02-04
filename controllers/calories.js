const Calorie = require('../models/calorie');

function newMeal(req, res, next) {
  res.render('calories/new');
}

function create(req, res) {
  
 const meal = new Calorie(req.body);
  meal.save (function(err, newCalorie) {
    if (err) 
    console.err(err); 
    return res.render('/calories/new');
    console.log(newCalorie);
    res.redirect('/calories/new');
  });
}


module.exports = {
  new: newMeal,
  create: create,
};

