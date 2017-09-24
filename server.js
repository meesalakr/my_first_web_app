var express = require('express');
var app = express();
var fs = require('fs');
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var multer = require('multer'); // v1.0.5
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-depfix");

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            // var datetimestamp = Date.now();
            cb(null, file.originalname)
        }
    });

var upload = multer({ //multer settings
                    storage: storage
                });// for parsing multipart/form-data
 var upload_json = multer({ //multer settings
                    storage: storage,
                    fileFilter : function(req, file, callback) { //file filter
                        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Wrong extension type'));
                        }
                        callback(null, true);
                    }
                }).any();

var session = require('express-session');
var login = require('./login.js');
var main = require('./main.js');
jsonfile.spaces=2;

app.use(cookieParser())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(session({secret: "Your secret key",resave: true,saveUninitialized: true}));
app.use('/components', express.static(__dirname+'/components'));
app.use('/assets', express.static(__dirname+'/assets'));
app.use('/shared', express.static(__dirname+'/shared'));
// app.use('/js', express.static(__dirname+'/js'));
// app.use('/css', express.static(__dirname+'/css'));
// app.use('/fonts', express.static(__dirname+'/fonts'));
// app.use('/partial-views', express.static(__dirname+'/partial-views'));

app.get('/authenticate', function(req,res){
    if(req.session.name){
    res.status(200).send({name:req.session.name,id:req.session.ATTUID,mail:req.session.mail});
    }
    else{
     res.sendStatus(401).send("OK");
    }
});

app.get('/', function(req,res){
    if(req.session.name){
    res.redirect('/main');
    }
    else{
     res.redirect('/login');
    }
});



function checkSignIn(req, res, next){
   if(req.session.name){
      next();     //If session exists, proceed to page
   } else {
      var err = new Error("Not logged in!");
      console.log(req.session.name);
      next(err);  //Error, trying to access unauthorized page!
   }
}

app.use('/login', login);
app.use('/main', main);


app.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
});

//==============================================================================================//

app.get('/columnchart/:id', function(req,res){
   console.log(req.params.id);
   res.sendStatus(200);
});

//==============================================================================================//

app.get('/CRdetails', function(req,res){

 jsonfile.readFile(__dirname+"/CRs_mod.json", function(err,obj){
        if(err){
            return console.log(err);
        }
        
            res.end(JSON.stringify(obj));
        
    })
});
console.log(new Date());
// =========================================================================================//
app.post('/form', function(req,res){

 jsonfile.readFile(__dirname+"/CRs_mod.json", function(err,obj){
        if(err){
            return console.log(err);
        } 
          for(x in obj){
            if(x == req.session.ATTUID){
              obj[x].push(req.body);  
              break;          
            }
          }
         jsonfile.writeFile(__dirname+"/CRs_mod.json", obj,function(err) {
            if(err) {
               return console.log(err);
            }
            // res.send('The file was saved!');
          });
    })

 jsonfile.readFile(__dirname+"/MOTS.json", function(err,obj){
    if(err){
      return console.log(err);
    }
    for(x in obj){
       if(x == req.body.MOTSID){
           obj[x].CRs++;
           obj[x].serversinCRs = obj[x].serversinCRs + req.body.totalcount;
            console.log(obj[x]);
            break;
       }

    }
     jsonfile.writeFile(__dirname+"/MOTS.json", obj,function(err) {
            if(err) {
               return console.log(err);
            }
            res.send('The file contents are saved!');
          });
  });

});

//================================================================================================//
app.put('/updateMOTS', function(req,res){

  jsonfile.readFile(__dirname+"/MOTS.json", function(err,obj){
    if(err){
      return console.log(err);
    }
    for(x in req.body){
      console.log(x);
      for(y in obj){
        console.log(y);
        if(x==y){
          obj[y]=req.body[x];
          console.log("value updated");
          break;
        }
      }
      console.log("Next");
    }
     jsonfile.writeFile(__dirname+"/MOTS.json", obj,function(err) {
            if(err) {
               return console.log(err);
            }
            res.send('The file contents are saved!');
          });

  });

});

//=============================================================================================//
app.get('/MOTSdetails', function(req,res){
  jsonfile.readFile(__dirname+"/MOTS.json", function(err,obj){
    if(err){
      return console.log(err);
    }
    res.end(JSON.stringify(obj));
  });
})



//=============================================================================================//
app.post('/reschedule', function(req,res){
  
})

// ==============================Followup=====================================//

app.get('/followup/:MOTS', function(req,res){
  jsonfile.readFile(__dirname+"/mails.json", function(err,obj){
    if(err){
      return console.log(err);
    }
    console.log(req.params.MOTS);
    for(x in obj){
      if(req.params.MOTS == x){
        var valuefound=true;
        res.end(JSON.stringify(obj[x]))
        break;
      } 
    }
    if(!valuefound){
    res.send("MOTSID do not exist");
    }
  });
})

app.post('/upload_init',upload.any(), function(req, res,next){
  console.log("request received")
  console.log(JSON.parse(req.body.field));
  console.log(req.files);
  res.send("Files uploaded successfully");
});

//================================approval api========================================//

 app.post('/converttojson', function(req, res) {
        var exceltojson;
        upload_json(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            console.log(req.files);
            // console.log(req.file);
            /** Multer gives us file info in req.file object */
            if(!req.files){
                res.json({error_code:1,err_desc:"No file passed"});
                return;
            }
            /** Check the extension of the incoming file and 
             *  use the appropriate module
             */
            if(req.files[0].originalname.split('.')[req.files[0].originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            console.log(req.files[0].path);
            try {
                exceltojson({
                    input: req.files[0].path,
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:true
                }, function(err,result){
                    if(err) {
                        return res.json({error_code:1,err_desc:err, data: null});
                    } 
                    res.json({data: result});
                });
            } catch (e){
                res.json({error_code:1,err_desc:"Corrupted excel file"});
            }
        })
       
    });
  

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, function(){
    console.log("app listening at port 3000.....");
});
