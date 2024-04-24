const DataService = require('../service/getTravelData');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:fromId/:toId',
    async function(req, res, next) {
      const fromId = req.params.fromId;
      const toId = req.params.toId;

      const service = new DataService();

      const resData = await service.getPathMap(fromId, toId);
      return res.json(resData);
});

module.exports = router;
