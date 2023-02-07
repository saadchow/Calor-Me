const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Weight = require('../models/Weight')

// @desc    Show add page
// @route   GET /weight/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('weight/add')
})

// @desc    Process add form
// @route   POST /weight
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.googleId
    await Weight.create(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show all weight
// @route   GET /weight
router.get('/', ensureAuth, async (req, res) => {
  try {
    const weight = await Weight.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('weight/index', {
      weight,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    let weight = await Weight.findById(req.params.id).lean()

    if (!weight) {
      return res.render('error/404')
    }

    if (weight.user != req.user.googleId) {
      res.redirect('/weight')
    } else {
      await Weight.remove({ _id: req.params.id })
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Show edit page
// @route   GET /weight/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const weight = await weight.findOne({
      _id: req.params.id,
    }).lean()

    if (!weight) {
      return res.render('error/404')
    }

    if (weight.user != req.user.googleId) {
      res.redirect('/weight')
    } else {
      res.render('weight/edit', {
        weight,
      })
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let weight = await Weight.findById(req.params.id).lean()

    if (!weight) {
      return res.render('error/404')
    }

    if (weight.user != req.user.googleId) {
      res.redirect('/weight')
    } else {
      weight = await Weight.findOneAndUpdate({ _id: req.params.id }, req.body, {
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
