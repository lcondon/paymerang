const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect('mongodb://127.0.0.1/paymerang');

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
