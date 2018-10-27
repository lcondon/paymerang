const router = require('express').Router();
const db = require('../../models');

router.route('/').get((req, res) => {
  db.Payment.find({}).then(results => {
    res.json(results);
  });
});

router.route('/:id').get((req, res) => {
  db.Payment.findById(req.params.id).then(result => {
    res.json(result);
  });
});

module.exports = router;
