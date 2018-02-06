var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

module.exports = function(db) {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    var db = mongojs('signin', ['important']);
    console.log(db.important);
    if(JSON.stringify(req.cookies) != "{}" && req.cookies.remember != undefined) {
      db.important.findOne({"username": req.cookies.remember.username}, function(err, doc) {
        if(doc != null)
          res.render('info', {title: 'info'});
        else
          res.render('login', {title: 'login'});
        });       
      }
      else if(req.query.username === undefined) {
        res.render('login', {title: 'login'});
      }  
  });

  router.post('/', function(req, res, next) {
    var db = mongojs('signin', ['important']);
    if(req.body.type == "username") {
      var result = "0";
      console.log(req.body.username + " c t");
      db.important.findOne({"username": req.body.username}, function(err, doc) {
          if(doc != null)
            result = "1";
          res.send(result);
      });
    }
    else if(req.body.type == "password") {
      var result = "00";
      db.important.findOne({"username": req.body.username}, function(err, doc) {
          if(doc != null) {
            result = "10";
            db.important.findOne({"username": req.body.username, "password": req.body.password}, function(err, doc) {
                if(doc != null) {
                  result = "11";
                  res.cookie('remember', {username: req.body.username, password: req.body.password},
                    {'expires':new Date(Date.now() + 900000)});
                  res.send(result);                  
                } else 
                  res.send(result);
            });            
          } else
            res.send(result);
      });
    }
  }); 
}
