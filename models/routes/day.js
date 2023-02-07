const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Day = require('../models/Day')

// @desc    Show add page
// @route   GET /day/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('day/add')
})

// @desc    Process add form
// @route   POST /day
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.googleId
    await Day.create(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show all days
// @route   GET /day
router.get('/', ensureAuth, async (req, res) => {
  try {
    const day = await Day.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('day/index', {
      day,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    let day = await Day.findById(req.params.id).lean()

    if (!day) {
      return res.render('error/404')
    }

    if (day.user != req.user.googleId) {
      res.redirect('/day')
    } else {
      await Day.remove({ _id: req.params.id })
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Show edit page
// @route   GET /days/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const day = await Day.findOne({
      _id: req.params.id,
    }).lean()

    if (!day) {
      return res.render('error/404')
    }

    if (day.user != req.user.googleId) {
      res.redirect('/day')
    } else {
      res.render('day/edit', {
        day,
      })
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let day = await Day.findById(req.params.id).lean()

    if (!day) {
      return res.render('error/404')
    }

    if (day.user != req.user.googleId) {
      res.redirect('/day')
    } else {
      day = await Day.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

module.exports = router
