const Day = require('../models/Day');

function create(req, res) {
  Day.findById(req.params.id, (err, day) => {
    const meal = {
      ...req.body,
      totalCalories: req.day.totalCalories,
      protein: req.day.protein,
      carbohydrates: req.day.carbohydrates,
      fats: req.day.fats,
    };


    day.meals.push(meal);
    day.save((err) => {
      console.log('error', err);
      res.redirect(`/day/${day._id}`);
    });
  });
}

function deleteMeal(req, res, next) {

  day.findOne({
    'meals._id': req.params.id,
    'meals.user': req.user._id,
  })
    .then((day) => {
      // base case when no record found
      if (!day) return res.redirect(`/day/${day._id}`);

      day.meals.remove(req.params.id);
      day
        .save()
        .then(() => res.redirect(`/day/${day._id}`))
        .catch((err) => next(err));
    })
    .catch((err) => {
     
      next(err);

    });
}

module.exports = {
  create,
  delete: deleteMeal,
};
