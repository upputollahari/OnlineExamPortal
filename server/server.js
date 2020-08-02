const mongoose = require('mongoose');
var mongodb = require('mongodb');
const express = require('express');
const app = express();
var config = require('./dbdetails/config');
var cors = require('cors');
var path = require('path');
const users=require('./routes/users');
const exams=require('./routes/exams');
const router = express.Router();

var mongoDbConfig = config.mongoDbConfig;
var dbName = config.dbName;
global.__basepath = __dirname;

// mongoose.connect('mongodb://localhost/haribank')
//   .then(() => console.log('Connected to MongoDB...'))
//   .catch(err => console.error('Could not connect to MongoDB...'));

var db = mongodb.connect(mongoDbConfig, { useNewUrlParser: true })
.then((dbInstance) => {
  console.log("Succesfully connected to the database");
  return Promise.resolve(dbInstance.db(dbName));
})
.catch((error) => {
  console.error("Error connecting Database");
  console.error(error);
  process.exit(1);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  req.db=db;
  next();
});
app.use(cors());
app.use(express.json());


// for static files
// app.use(express.static(path.join(__dirname, '../dist')));//"dist/EvidenceRoom")));
app.use('/api/users', users);
app.use('/api/exams', exams);






const port = config.serverPort;
app.listen(port, () => console.log(`Listening on port ${port}...`));