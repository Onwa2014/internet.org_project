var MongoClient = require('mongodb').MongoClient;
 //var io = require('socket.io');
 mongodb = require('mongodb')

 var ObjectId = mongodb.ObjectId;

exports.puzzles = function(req,res,next){
  var _id = req.params.id;

  console.log("milonie");
  console.log(req.body);
  console.log(_id);

    var applicationFields = {
      puzzle1 : req.body.puzzle1,
      puzzle2 : req.body.puzzle2,
      heard_about_codex: req.body.heard_about_codex,
      application_status:req.body.application_status,
      route:"http://localhost:8080"+req.path,
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
};