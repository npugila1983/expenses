var db = require('../db')

// Create new comment in your database and return its id
exports.create = function(user, text, cb) {
  var expense = {
    user: user,
    text: text,
    date: new Date().toString()
  }

  db.save(expense, cb)
}

// Get a particular comment
exports.get = function(id, cb) {
	var collection = db.get().collection('expenses')
	console.log(id);
	collection.find({"a":id}, function(err, docs) {
	  console.log(err);
	  if (err) return cb(err)
	  	cb(null, docs)
	})
}

exports.all = function(cb) {
	console.log("get all expenses");
	var collection = db.get().collection('expenses')

  collection.find().toArray(function(err, docs) {
    cb(err, docs)
  })
}

exports.recent = function(cb) {
  var collection = db.get().collection('expenses')

  collection.find().sort({'date': -1}).limit(100).toArray(function(err, docs) {
    cb(err, docs)
  })
}