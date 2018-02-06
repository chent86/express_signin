var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('register', {title: 'register'});
});

router.post('/', function(req, res, next) {  
  if (check(req.body.username, req.body.password, req.body.number,
    req.body.tel, req.body.mail)) {                   //POST                                 
    tmp = {};                            //just post infomation from UI to server 
    tmp.username = req.body.username;        // and save it in an Array temporarily
    tmp.password = req.body.password;
    tmp.number = req.body.number;
    tmp.tel = req.body.tel;
    tmp.mail = req.body.mail;
    var result = new Array("0","0","0","0","0");
    db.important.findOne({"username": tmp.username}, function(err, doc) {
        if(doc != null)
          result[0] = '1';
        db.important.findOne({"number": tmp.number}, function(err, doc) {
            if(doc != null)
              result[1] = '1';
            db.important.findOne({"tel": tmp.tel}, function(err, doc) {
                if(doc != null)
                  result[2] = '1';
                db.important.findOne({"mail": tmp.mail}, function(err, doc) {
                    if(doc != null)
                      result[3] = '1';
                    if(parseInt(result[0]+result[1]+result[2]+result[3]) == 0)
                      db.important.insert(tmp);
                    res.cookie('remember', {username: req.body.username, password: req.body.password},
                            {'expires':new Date(Date.now() + 900000)});
                    res.send(result[0]+result[1]+result[2]+result[3]);
                });
            });
        });
    });
  }  
});

router.post('/one', function(req, res, next) {  
  var db = mongojs('signin', ['important']);
  if(req.body.username != undefined) {
      db.important.findOne({"username": req.body.username}, function(err, doc) {
        if(doc != null)
          res.send("error")
      });
  }
  else if(req.body.number != undefined) {
      db.important.findOne({"number": req.body.number}, function(err, doc) {
        if(doc != null)
          res.send("error")
      });
  }
  else if(req.body.tel != undefined) {
    db.important.findOne({"tel": req.body.tel}, function(err, doc) {
      if(doc != null)
        res.send("error")
    });
  }
  else if(req.body.mail != undefined) {
    db.important.findOne({"mail": req.body.mail}, function(err, doc) {
      if(doc != null)
        res.send("error")
    });
  }
});

function check(username, password, number, tel, mail) {
  var result = true;
  var name_check = /^[a-zA-Z][_0-9a-zA-Z]{5,17}$/;
  // var password_check = /^[_\-0-9a-zA-Z]{6,12}$/;
  var number_check = /^[1-9]\d{7,7}$/;
  var tel_check = /^[1-9]\d{10,}$/;
  var mail_check = /^[0-9a-zA-Z_\-]+@(([0-9a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/;
  if(username == "" || password == "" || number == "" || tel == "" || mail == "")
    result = false;
  else if(!name_check.test(username) || !number_check.test(number)
    || !tel_check.test(tel) || !mail_check.test(mail))
    result = false;
  return result;
}

module.exports = router;
