var express = require('express')
  , router = express.Router()

var Expenses = require('../models/expenses')

router.post('/create', function(req, res) {
  title = req.body.title
  amount = req.body.amount

  Expenses.create(title, amount, function (err, comment) {
    res.redirect('/')
  })
})

router.get('/get/:id', function(req, res) {
	Expenses.get(req.params.id, function (err, expense) {
	  res.json(expense);
	 //res.render('comments/comment', {comment: comment})
  })
})


router.get('/all', function(req, res) {
	Expenses.all(function(err, expenses) {
	  res.json(expenses);
  })
})

router.get('/recent', function(req, res) {
	Expenses.recent(function(err, docs) {
    res.render('comments', {comments: docs})
  })
})

module.exports = router