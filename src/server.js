const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require("mongodb").ObjectID
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
MongoClient.connect('mongodb://localhost:27017/LogLite', function(err, database) {
  if(err) throw err.message;
  db = database;
  app.listen(3080, function () {
    console.log('LogLite wapp listening on port 3080!')
  })
});

app.get('/', function (req, res) {
  projection = {'wis': 1, 'tag': 1, 'startTime': 1, 'endTime': 1, 'date': 1, 'duration': 1, '_id': 1};
  const query = { wis: Number(req.query.wis) };
  db.collection('logsInfo').find(query, projection).toArray((err, doc) => {
    if(err) throw err;
    res.json(doc);
  })
})

app.post('/insertLogInfo', (req, res) => {
  db.collection('logsInfo').insertOne(req.body, (err, result) => {
    console.log(req.body)
    if (err) return console.log(err)
    console.log('saved to database')
    res.send(result.ops[0])
  })
})

app.get('/deleteLogInfo', (req, res) => {
  const query = { _id: ObjectID(req.query._id) };
  console.log(query);
  db.collection('logsInfo').remove(query, (err, result) => {
    console.log(result)
    if (err) return console.log(err)
    console.log('removed from database')
    res.send('deleted successfully!')
  })
})
