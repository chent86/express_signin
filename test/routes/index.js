var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = mongojs('ct', ['table']);
  db.table.findOne({"name": "chen"},
  	function(err, doc) {
  		console.log("success->" + doc["age"]);
	  	res.render('index', { title: 'Express' });
  	})
});

module.exports = router;
