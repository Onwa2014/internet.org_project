var MongoClient = require('mongodb').MongoClient;
//var io = require('socket.io');

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