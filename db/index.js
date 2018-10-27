const mongoose = require('mongoose');

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/paymerang';

mongoose.Promise = Promise;
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on('error', err => {
  console.log(`There was an error connecting to the database: ${err}`);
});
db.once('open', () => {
  console.log(
    `You have successfully connected to your mongo database: ${MONGODB_URI}`
  );
});

module.exports = db;
