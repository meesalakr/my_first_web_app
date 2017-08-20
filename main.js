var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');


function checkSignIn(req, res, next){
   if(req.session.name){
      next();     //If session exists, proceed to page
   } else {
      var err = new Error("Not logged in!");
      console.log(req.session.name);
      next(err);  //Error, trying to access unauthorized page!
   }
}

router.get(['/','/details','/form','/followup','/status'], checkSignIn, function(req,res){
   console.log(req.session)
   res.sendFile(__dirname+'/index.html');
});

router.use(['/','/details','/form','/followup','/status'], function(err, req, res, next){
console.log(err);
   //User should be authenticated! Redirect him to log in.
   res.redirect('/login');
});





//export this router to use in our server.js
module.exports = router;