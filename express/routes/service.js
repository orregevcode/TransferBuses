const transportation = require('../data/transport.json');
const locations = require('../data/locations.json');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/transportation', async function (req, res, next) {
  return res.json(transportation);
});
router.get('/locations', async function (req, res, next) {
  return res.json(locations);
});

module.exports = router;
