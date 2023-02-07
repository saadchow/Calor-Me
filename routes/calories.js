const express = require('express');

const router = express.Router();
const caloriesCtrl = require('../controllers/calories');

// GET 
router.get('/new', caloriesCtrl.new);

//POST
router.post('/', caloriesCtrl.create);
router.get ('/', caloriesCtrl.index);

module.exports = router;

