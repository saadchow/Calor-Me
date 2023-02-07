const express = require('express')

const router = express.Router();
const mealsCtrl = require('../controllers/meals');

router.post('/day/:id/meals', mealsCtrl.create);
router.delete('/meals/:id', mealsCtrl.delete);

module.exports = router;

const { ensureAuth } = require('../middleware/auth')

router.get('/add', ensureAuth, (req, res) => {
  res.render('meals/add')
})

// router.get('/add/:id', ensureAuth, async (req, res) => {
//   try {
//     const meal = await Day.findOne({
//       _id: req.params.id,
//     }).lean()

//     if (!day) {
//       return res.render('error/404')
//     }

//     if (day.user != req.user.googleId) {
//       res.redirect('/day')
//     } else {
//       res.render('day/edit', {
//         day,
//       })
//     }
//   } catch (err) {
//     console.error(err)
//     return res.render('error/500')
//   }
// })
// router.post('/', ensureAuth, async (req, res) => {
//   try {
//     req.body.user = req.user.googleId
//     await day.meal.create(req.body)
//     res.redirect('/dashboard')
//   } catch (err) {
//     console.error(err)
//     res.render('error/500')
//   }
// })

// router.get('/', ensureAuth, async (req, res) => {
//   try {
//     const meal = await Meal.find({ status: 'public' })
//       .populate('user')
//       .sort({ createdAt: 'desc' })
//       .lean()

//     res.render('Meal/index', {
//       meal,
//     })
//   } catch (err) {
//     console.error(err)
//     res.render('error/500')
//   }
// })

// router.delete('/:id', ensureAuth, async (req, res) => {
//   try {
//     let meal = await Meal.findById(req.params.id).lean()

//     if (!meal) {
//       return res.render('error/404')
//     }

//     if (meal.user != req.user.googleId) {
//       res.redirect('/meals')
//     } else {
//       await Meal.remove({ _id: req.params.id })
//       res.redirect('/dashboard')
//     }
//   } catch (err) {
//     console.error(err)
//     return res.render('error/500')
//   }
// })

// router.get('/edit/:id', ensureAuth, async (req, res) => {
//   try {
//     const meal = await Meal.findOne({
//       _id: req.params.id,
//     }).lean()

//     if (!meal) {
//       return res.render('error/404')
//     }

//     if (meal.user != req.user.googleId) {
//       res.redirect('/meals')
//     } else {
//       res.render('meals/edit', {
//         meal,
//       })
//     }
//   } catch (err) {
//     console.error(err)
//     return res.render('error/500')
//   }
// })

// router.put('/:id', ensureAuth, async (req, res) => {
//   try {
//     let meal = await Meal.findById(req.params.id).lean()

//     if (!meal) {
//       return res.render('error/404')
//     }

//     if (meal.user != req.user.googleId) {
//       res.redirect('/meals')
//     } else {
//       meal = await Meal.findOneAndUpdate({ _id: req.params.id }, req.body, {
//         new: true,
//         runValidators: true,
//       })

//       res.redirect('/dashboard')
//     }
//   } catch (err) {
//     console.error(err)
//     return res.render('error/500')
//   }
// })

//module.exports = router
