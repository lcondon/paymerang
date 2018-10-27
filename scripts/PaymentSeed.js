const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect(
  'mongodb://heroku_q809ch27:8vn3k20rffahk6c5ncc5de7jfj@ds143603.mlab.com:43603/heroku_q809ch27'
);

const paymentSeed = require('./generated.json');

db.Payment.remove({})
  .then(() => db.Payment.collection.insertMany(paymentSeed))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
