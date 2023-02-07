const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Day = require('../models/Day')
const Weight = require('../models/Weight')

router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const days = await Day.find({ user: req.user.googleId}).lean()
    res.render('dashboard', {
      name: req.user.firstName,
      days: days,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

router.get('/profile', ensureAuth, async (req, res) => {
  try {
    const weights = await Weight.find({ user: req.user.googleId}).lean()
    res.render('profile/profile', {
      name: req.user.firstName,
      weights: weights,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show single day
// @route   GET /day/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let day = await Day.findById(req.params.id).populate('user').lean()

    if (!day) {
      return res.render('error/404')
    }

    if (day.user._id != req.user.googleId && day.status == 'private') {
      res.render('error/404')
    } else {
      res.render('day/show', {
        day,
      })
    }
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

module.exports = router
