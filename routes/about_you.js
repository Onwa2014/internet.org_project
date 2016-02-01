var MongoClient = require('mongodb').MongoClient;
 //var io = require('socket.io');
 mongodb = require('mongodb')

 var ObjectId = mongodb.ObjectId;

exports.aboutYou = function(req,res,next){
	var _id = req.params.id;

  console.log("Aphelele");
  console.log(req.body);
  console.log(_id);


  var whatToDo = "";

    var NEXT = "nextScreen";
    var SAVE_FOR_LATER = "saveForLater";

    if (req.body.nextBtn !== undefined ){
      console.log("next button pressed");
      whatToDo = NEXT;
    }
    else if (req.body.saveForLaterBtn !== undefined){
      console.log("save for later button pressed")
      whatToDo = SAVE_FOR_LATER;
    }

    var applicationFields = {
      background : req.body.background,
      why_codex : req.body.why_codex,
      problem_solved: req.body.problem_solved,  
      route:"http://localhost:8080"+req.path,
      application_status: "In Progress"
    };

    MongoClient.connect(url, function(err, db) {
        var applications = db.collection('applications');
        applications
            .updateOne( { _id : ObjectId(_id) }, {$set : applicationFields})
            .then(function(result){
                //res.redirect('/applicationForm/puzzles/' + _id );
                if(whatToDo === NEXT){
                res.redirect('/applicationForm/puzzles/' + _id );
              }
              else{
                // todo send email...
                res.render("save_for_later", applicationFields)
              }    
            })
            .catch(function(err){
                // log the error to the console for now
                console.log(err);
                res.send(err.stack);
            });
    });
};
