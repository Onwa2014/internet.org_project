var MongoClient = require('mongodb').MongoClient;
 //var io = require('socket.io');
 mongodb = require('mongodb')
 
 //Connect to mongodb [ConnectionURL]
 var url = 'mongodb://localhost:27017/free_basics';
  console.log("Onwaba");
  //console(req.body);
 
 exports.application = function(req, res, next){
 	console.log(req.body)
  
  	var applicationData = {
         got_experience : req.body.coding_experience,
       	 experience : req.body.coding_experience_details,
         codecademyEmail:req.body.codecademyEmail
      };
  
      MongoClient.connect(url, function(err, db) {
      	if (err) return next(err);
         var applications = db.collection('applications');
         applications
             .insertOne(applicationData)
             .then(function(result){
                 res.redirect('/applicationForm/question2/' + result.ops[0]._id );
             })
             .catch(function(err){
                 // log the error to the console for now
                 console.log(err);
                 res.send({});
             });
     });
 
 };
 
 exports.update = function(req,res,next){
 
 	// var inputData = JSON.parse(JSON.stringify(req.body));
 	// console.log(req.body);
 	console.log("Aphelele")
 
 	
 };
 exports.saveforLater = function(req,res,next){
  var route = req.path;
    console.log(route)
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log(err,"\n");
    }
      var applications = db.collection('applications');   
      
      // what I am looking for...
      applications.find({}, {
        "first_name": 1,
        "route": 1,
        "aplication_status": 1
      }); 
      db.close();
      return res.render('save_for_later',{

      });           
  });
};
 
