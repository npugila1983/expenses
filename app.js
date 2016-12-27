var express = require('express')
  , app = express()
  , config = require('./config')()
  , db = require('./db')

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/expenses', require('./controllers/expenses'))

// Connect to Mongo on start
db.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/expenses', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(config.port, function() {
      console.log('Listening on port ' + config.port + '...')
    })
  }
})