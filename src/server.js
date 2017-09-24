const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
app.use(cors({
  origin: '*',
}));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Handler for internal server errors
function errorHandler(err, req, res, next) {
  console.log(err.message);
  console.log(err.stack);
  res.status(500);
  res.render('error_template', { error: err});
}
app.use(errorHandler);

var db
MongoClient.connect('mongodb://localhost:27017/test', function(err, database) {
  if(err) throw err.message;
  db = database;
  var query = {'tag': 'break'};
  // var projection = {'tag': 1, '__id': 0};
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })
});

app.get('/', function (req, res) {
  // var projection = {'tag': 1, 'date': 1, 'startTime': 1, 'endTime': 1, 'duration': 1, '__id': 0};
  db.collection('logsInfo').find({}).toArray((err, doc) => {
    console.log('from get!')
    if(err) throw err;
    res.json(doc)
  })
})

app.post('/insertLogInfo', (req, res) => {
  db.collection('logsInfo').insertOne(req.body, (err, result) => {
    console.log(req.body)
    if (err) return console.log(err)
    console.log('saved to database')
    res.send('inserted successfully!')
  })
})

app.post('/deleteLogInfo', (req, res) => {
  db.collection('logsInfo').remove(req.body, (err, result) => {
    console.log(req.body)
    if (err) return console.log(err)
    console.log('removed from database')
    res.send('deleted successfully!')
  })
})
