var express = require('express');
var router = express.Router();
router.check = {}
router.get('/', function(req, res){
   res.sendFile(__dirname+'/mainView.html');
});

var users = [{name:'pavan',ATTUID:'pk578j',mail:'pk578j@att.com'},{name:'koteswar',ATTUID:'km0795',mail:'km0795@att.com'},{name:'sem',ATTUID:'ss810b',mail:'ss810b@att.com'}]
router.post('/signin', function(req, res){
   if(!req.body.id || !req.body.password){
      res.send({msg:"Please enter both id and password",isAuthorised:false});
      }
   //  else if( req.body.id === 'admin' && req.body.password === 'admin'){
   //          req.session.user = req.body.id
   //          req.session.ATTUID = 'km0795'
   //          req.session.mail = 'km0795@att.com';
   //          res.send({msg:"Successfully loggedIn!",isAuthorised:true});
   //        }
     else{
         var index = users.findIndex(function(user){
          return user.name == req.body.id;
         });
         if(index >=0){
          console.log(req.body.id)
          if(req.body.password == 'admin'){
            console.log(req.body.password)
            req.session.name = req.body.id;
            req.session.ATTUID = users[index].ATTUID;
            req.session.mail = users[index].mail;
            res.send({msg:"Successfully loggedIn!",isAuthorised:true});
          }
          else{
            res.send({msg:"Invalid credentials!",isAuthorised:false});
          }}
          else{
            res.send({msg:"Invalid credentials!",isAuthorised:false});
          }
         
      }
});


// router.post('/signin', function(req, res){
//  if(req.body.id == 'admin' && req.body.password == 'admin'){
//    console.log(req.body);
//    router.check.isAuthorised= true
//    router.check.isLoggedin = true
//    res.send(router.check);
//    req.session.user = user;
//    }
//   else{
//      console.log("Wrong credentials")
//      router.check.isAuthorised= false 
//      router.check.isLoggedin = false
//      res.send(check);
//   }
// });




//export this router to use in our server.js
module.exports = router;