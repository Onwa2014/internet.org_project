var express = require('express'),	
  	exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
  	mongodb = require('mongodb'),
    nodemailer = require("nodemailer"),
    newApplicant = require('./routes/newApplicant'),
  	financial_info = require('./routes/financial_info'),
    sponsorship = require('./routes/sponsorship'),
    about_you = require('./routes/about_you'),
    puzzles = require('./routes/puzzles');

var ObjectId = mongodb.ObjectId;

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
//parse/application/json
app.use(bodyParser.json());

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

 // Connection URL 
 var url = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/free_basics';
 
 var paths = {
    "question1" : "question2",
    "question2" : "about_you",
    "about_you" : "financial_info",
    "financial_info":"puzzles",
    "puzzles" : ""

 }
 //var path = req.path;

app.get("/", function (req,res) {
    res.render("home")
});
app.get('/save_for_later',newApplicant.saveforLater);
    

app.get('/applicationForm',function (req,res, next){
    var route = req.path;
    console.log(route)
    res.render('question1' );
});

app.post('/applicationForm',newApplicant.application);

app.get("/applicationForm/question2/:id", function (req,res) {
    var route = req.path;
    console.log(process.env.basic_apps_localDaemon + route)
    res.render("question2", {_id : req.params.id });
 });
app.post('/applicationForm/question2/:id',newApplicant.question2);
	
app.get("/learn", function (req,res) {
  res.render("learn")
});
app.get("/applicationForm/financial_info/:id", function (req,res) {
     var route = req.path;
    console.log("http:/" + route)
     res.render("financial_info", {_id : req.params.id });
});
app.post('/applicationForm/financial_info/:id',financial_info.fin_info);

app.get('/applicationForm/sponsorship_required/:id',function (req,res){
  var route = req.path;
  console.log("http:/" + route)
  res.render("sponsorship_required", {_id : req.params.id });
});

app.get('/aboutUs',function (req,res){
  res.render("about_codex");
});

app.get('/about/info',function (req,res){
  res.render("whatInfo");
});

app.get('/whereAbouts/info',function (req,res){
  res.render("whereAbouts");
});

app.get('/when/info',function (req,res){
  res.render("whenInfo");
});

app.post('/applicationForm/sponsorship_required/:id', sponsorship.sponsorship_required);
  
app.get('/applicationForm/sponsorship_not_required/:id',function (req,res){
  var route = req.path;
  console.log("http:/" + route)
  res.render("sponsorship_not_required", {_id : req.params.id });
});

app.post('/applicationForm/sponsorship_not_required/:id', sponsorship.sponsorship_not_required); 
  
app.get("/applicationForm/about_you/:id", function (req,res) {
      var route = req.path;
      console.log("http:/" + route)
     res.render("about_you",{_id: req.params.id});
});
app.post('/applicationForm/about_you/:id',about_you.aboutYou); 
  
app.get("/applicationForm/puzzles/:id", function (req,res) {
    var route = req.path;
      console.log("http:/" + route)
     res.render("puzzles",{_id:req.params.id});
});
app.post('/applicationForm/puzzles/:id',puzzles.puzzles); 
 
//start everything up
var port = process.env.PORT || 2003;

app.listen( port, function(){
  console.log('listening on *:' + port);
});