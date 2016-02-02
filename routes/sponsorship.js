var MongoClient = require('mongodb').MongoClient;
 //var io = require('socket.io');
 mongodb = require('mongodb')

 var ObjectId = mongodb.ObjectId;

 exports.sponsorship_required = function(req,res,next){
 	var _id = req.params.id;

  console.log("vivi");
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
        household_income: req.body.household_income,
        household_people: req.body.household_people,
        travel_cost:req.body.travel_cost,
        route:"http://localhost:2003"+req.path,
        application_status: "In Progress"
    };

    MongoClient.connect(url, function(err, db) {
        var applications = db.collection('applications');
        applications
            .updateOne( { _id : ObjectId(_id) }, {$set : applicationFields})
            .then(function(result){
                  //res.redirect('/applicationForm/about_you/' + _id ); 
                  if(whatToDo === NEXT){
                res.redirect('/applicationForm/about_you/' + _id );
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

exports.sponsorship_not_required = function(req,res,next){
	var _id = req.params.id;

  console.log("iviwe");
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
        responsiblePerson_name: req.body.responsiblePerson_name,
        responsiblePerson_lastname: req.body.responsiblePerson_lastname,
        responsiblePerson_phoneNumber:req.body.responsiblePerson_phoneNumber,
        responsiblePerson_email:req.body.responsiblePerson_email,
        route:"http://localhost:2003"+req.path,
        application_status: "In Progress"
    };

    MongoClient.connect(url, function(err, db) {
        var applications = db.collection('applications');
        applications
            .updateOne( { _id : ObjectId(_id) }, {$set : applicationFields})
            .then(function(result){
                  //res.redirect('/applicationForm/about_you/' + _id );
                  if(whatToDo === NEXT){
                res.redirect('/applicationForm/about_you/' + _id );
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
