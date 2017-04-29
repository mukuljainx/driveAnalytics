var express = require('express');
var router = express.Router();
var passport = require('passport');
var google = require('../user/authenticate').google;
var googleValidate = require('../user/authenticate').googleValidate;
var GoogleAuth = require('google-auth-library');
var Verify = require('../user/verify');
var User = require('../models/user');
var googleSetting = require('../config/auth').googleAuth;

/* GET users listing. */
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }), function(req,res){});
// the callback after google has authenticated the user

router.get('/auth/google/callback', function(req,res,next){
  passport.authenticate('google', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
          console.log(err);
        return res.status(500).json({
          err: 'Could not log in user'
        });
    }
      var token = Verify.getToken(user);
      res.cookie('access-token', token ,{ httpOnly: true, secure : false });
      res.render('redirect',{
          isLoggedIn : false,
          valid : user.valid,
      });
    });
  })(req,res,next);
});


router.post('/user_validate', Verify.verifyOrdinaryUser ,function(req, res) {
    User.findOne({ 'email' :  req.decoded.sub }, function(err, user) {
        // if there are any errors, return the error
        if (err){
            return done(err);
        }
        // check to see if theres already a user with that email
        if (user) {
            if(!user.valid){
                res.json({"status" : false, "email" : user.email, "name" : user.name});
            }
            else if(user.valid){
                res.cookie('access-token', Verify.getToken(user),{ httpOnly: true, secure : false });
                res.json({"status" : true});
            }
            else{
                res.json({"status" : false});
            }
        }
    });
});

router.post('/user_register_complete', Verify.verifyOrdinaryUser ,function(req, res) {
    User.count(function(err,count){
        var update = {
            phoneNumber       : req.body.phoneNumber,
            country           : req.body.country,
            dateOfBirth       : req.body.dateOfBirth,
            city              : req.body.city,
            gender            : req.body.gender,
            valid             : true,
            totalTrips        : 0,
            cars              : [],
            driverRating      : "No Rating Yet",
            driverRatingPoint : -1,
            lastTripRating    : -1,
            driverId          : "driver-" + count,
        };
        // User.findOneAndUpdate({'email' : req.decoded.sub}, update, {new: true}, function(err, user) {
        User.findOneAndUpdate({'email' : req.body.email}, update, {new: true}, function(err, user) {
            if (err){
                return next(err);
            }
            else if (user) {
                res.cookie('access-token', Verify.getToken(user),{ httpOnly: true, secure : false });
                res.json({"status" : true});
            }
            else{
                res.json({"status" : false, "msg" : "User not found"});
            }
        });
    })
});


router.post('/logout', Verify.verifyOrdinaryUser ,function(req, res) {
    res.clearCookie("access-token");
    res.json({"status": true})
});


router.post('/user_register_complete_mobile/google',function(req, res) {
    var auth = new GoogleAuth;
    var client = new auth.OAuth2(googleSetting.clientID);
    client.verifyIdToken( req.body.access_token, googleSetting.clientID, function(err, login) {
          if(err){
              res.json({status : "false"});
              return;
            }else{
              var payload = login.getPayload();
              var email = payload['email'];
              User.findOne({'email' : email}, function(err,user){
                  if(err){
                      console.log(err);
                      res.json({status : "false", msg : err.message});
                      return;
                  }
                  else if(user){
                      console.log(user)
                      res.json({status : "false", msg : "user already exit"});
                      return;
                  }
                  else{
                      if(email !== req.body.email){
                          res.json({status : "false", msg : "something wrong!"});
                          return;
                      }
                      else{
                          User.count(function(err, count){
                              var user = new User();
                              user.phoneNumber       = req.body.phoneNumber;
                              user.country           = req.body.country;
                              user.dateOfBirth       = req.body.dateOfBirth;
                              user.city              = req.body.city;
                              user.gender            = req.body.gender;
                              user.name              = req.body.name;
                              user.email             = email;
                              user.valid             = true;
                              user.googleid          = req.body.id;
                              user.googletoken       = req.body.access_token;
                              user.totalTrips        = 0,
                              user.driverId          = count + 1,
                              user.driverRating      = "No Rating Yet";
                              user.driverRatingPoint = -1;
                              user.lastTripRating    = -1;
                              user.cars              = [];
                              user.save(function(err) {
                                  if(err){
                                      console.log(err);
                                      res.json({status : "false", msg : err.message});
                                      return;
                                  }
                                  else{
                                      res.json({status : "true"});
                                      return;
                                  }
                              });
                          })
                      }
                  }
              })
          }
     });
});


router.post('/user_validate_mobile/google',function(req, res) {
    var auth = new GoogleAuth;
    var client = new auth.OAuth2(googleSetting.clientID);
    client.verifyIdToken( req.body.access_token, googleSetting.clientID, function(err, login) {
          if(err){
              res.json({status : "false"});
              return;
            }else{
              var payload = login.getPayload();
              var email = payload['email'];
              User.findOne({'email' : email}, function(err,user){
                  if(err){
                      console.log(err);
                      res.json({status : "false"});
                      return;
                  }
                  else if(user){
                      userx = {
                          status : "true",
                          phoneNumber  : user.phoneNumber,
                          country  : user.country,
                          dateOfBirth  : user.dateOfBirth,
                          city  : user.city,
                          gender  : user.gender,
                          name  : user.name,
                          email  : user.email,
                          driverRating : user.driverRating,
                          driverRatingPoint : user.driverRatingPoint,
                          lastTripRating : user.lastTripRating,
                          totalTrips : user.totalTrips,
                          driverId : user.driverId,
                          cars : user.cars,
                      }
                      res.json(userx);
                      return;
                  }
                  else{
                      res.json({status : "false"});
                  }
              })
          }
     });
});




module.exports = router;
