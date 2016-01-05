var express = require('express'),	
	exphbs = require('express-handlebars'),
	bodyParser = require('body-parser');
  	// formPge1 = require('./routes/formPge1');
  	MongoClient = require('mongodb').MongoClient
  	mongodb = require('mongodb')
  	newApplicant = require('./routes/newApplicant')

var ObjectId = mongodb.ObjectId;


var app = express();
//var url = 'mongodb://localhost:27017/free_basics';

app.use(bodyParser.urlencoded({extended: false}));
//parse/application/json
app.use(bodyParser.json());

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
//app.use('/bower_components',  express.static(__dirname + '/bower_components'));

 
// // Connection URL 
 var url = 'mongodb://localhost:27017/free_basics';
// // Use connect method to connect to the Server 
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");
 
//   db.close();
// });

app.get("/", function (req,res) {
    res.render("home")
});

app.get('/applicationForm',function(req, res, next){
    res.render('question1');
});

app.post('/create',newApplicant.application);

//app.get("/applicationForm", function (req,res) {
    //res.render("question1")
//});


app.get("/applicationForm/question2/:id", function (req,res) {
    res.render("question2", {_id : req.params.id });
 });
app.post('/applicationForm/question2/:id', function (req,res) {
	var _id = req.params.id;

	console.log("zonke");
	console.log(req.body);
  console.log(_id);

    var applicationFields = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email_address: req.body.email_address,
        phone_number: req.body.phone_number,
        dateofbirth: req.body.date_of_birth,
        city: req.body.city,
        education_and_experience: req.body.education_and_experience,
        ref_name_and_surname: req.body.ref_name_and_surname,
        ref_email_add: req.body.ref_email_add,
        ref_phone_number: req.body.ref_phone_number,
        relationship: req.body.relationship
    };

    MongoClient.connect(url, function(err, db) {
        var applications = db.collection('applications');
        applications
            .updateOne( { _id : ObjectId(_id) }, {$set : applicationFields})
            .then(function(result){
                res.redirect('/applicationForm/financial_info/' + _id );
            })
            .catch(function(err){
                // log the error to the console for now
                console.log(err);
                res.send(err.stack);
            });
    });
});
app.get("/codecademy", function (req,res) {
  res.render("codecademy")
});
app.get("/applicationForm/financial_info/:id", function (req,res) {
     res.render("financial_info", {_id : req.params.id });
});
app.post('/applicationForm/financial_info/:id', function (req,res) {
  var _id = req.params.id;

  console.log("yolanda");
  console.log(req.body);
  console.log(_id);

    var applicationFields = {
        financial_support : req.body.financial_supp,
        household_income : req.body.household_income,
        household_people: req.body.household_people,
        travel_cost: req.body.travel_cost,
        responsiblePerson_name: req.body.responsiblePerson_name,
        responsiblePerson_lastname: req.body.responsiblePerson_lastname,
        responsiblePerson_phoneNumber: req.body.responsiblePerson_phoneNumber,
        responsiblePerson_email: req.body.responsiblePerson_email,
        ref_email_add: req.body.ref_email_add
    };

    MongoClient.connect(url, function(err, db) {
        var applications = db.collection('applications');
        applications
            .updateOne( { _id : ObjectId(_id) }, {$set : applicationFields})
            .then(function(result){
                res.redirect('/applicationForm/about_you/' + _id );
            })
            .catch(function(err){
                // log the error to the console for now
                console.log(err);
                res.send(err.stack);
            });
    });
});
app.get("/applicationForm/about_you/:id", function (req,res) {
     res.render("about_you",{_id: req.params.id});
});
app.post('/applicationForm/about_you/:id', function (req,res) {
  var _id = req.params.id;

  console.log("Aphelele");
  console.log(req.body);
  console.log(_id);

    var applicationFields = {
      background : req.body.background,
      why_codex : req.body.why_codex,
      problem_solved: req.body.problem_solved  
    };

    MongoClient.connect(url, function(err, db) {
        var applications = db.collection('applications');
        applications
            .updateOne( { _id : ObjectId(_id) }, {$set : applicationFields})
            .then(function(result){
                res.redirect('/applicationForm/puzzles/' + _id );
            })
            .catch(function(err){
                // log the error to the console for now
                console.log(err);
                res.send(err.stack);
            });
    });
});
app.get("/applicationForm/puzzles/:id", function (req,res) {
     res.render("puzzles",{_id:req.params.id});
});
app.post('/applicationForm/puzzles/:id', function (req,res) {
  var _id = req.params.id;

  console.log("milonie");
  console.log(req.body);
  console.log(_id);

    var applicationFields = {
      puzzle1 : req.body.puzzle1,
      puzzle2 : req.body.puzzle2,
      heard_about_codex: req.body.heard_about_codex,
      application_status:req.body.application_status
    };

    MongoClient.connect(url, function(err, db) {
        var applications = db.collection('applications');
        applications
            .updateOne( { _id : ObjectId(_id) }, {$set : applicationFields})
            .then(function(result){
                res.redirect('/');
            })
            .catch(function(err){
                // log the error to the console for now
                console.log(err);
                res.send(err.stack);
            });
    });
});
//start everything up
var port = process.env.PORT || 8080;

app.listen( port, function(){
  console.log('listening on *:' + port);
});