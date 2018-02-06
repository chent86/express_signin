var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = mongojs('signin', ['important']);
  db.important.findOne({"username": req.cookies.remember.username, "password":req.cookies.remember.password},
  function(err, doc) {
    if(doc != null)
      res.send(doc["username"] +  " " + doc["number"] + " " 
        + doc["tel"] + " " + doc["mail"] + " ")
  }) 
});

module.exports = router;
