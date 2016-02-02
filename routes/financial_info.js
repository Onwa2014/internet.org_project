var MongoClient = require('mongodb').MongoClient;
 //var io = require('socket.io');
 mongodb = require('mongodb')

 var ObjectId = mongodb.ObjectId;

 exports.fin_info = function function_name (req,res,next) {

 	  var _id = req.params.id;

  console.log("yolanda");
  console.log(req.body);
  console.log(_id);
    



    var applicationFields = {
        financial_support : req.body.financial_supp,
        route:"http://localhost:2003"+req.path,
        application_status: "In Progress"
    };

    MongoClient.connect(url, function(err, db) {
        var applications = db.collection('applications');
        applications
            .updateOne( { _id : ObjectId(_id) }, {$set : applicationFields})
            .then(function(result){
               if (applicationFields.financial_support === "yes") {
                  res.redirect('/applicationForm/sponsorship_required/' + _id );
               }
               else {
                  res.redirect('/applicationForm/sponsorship_not_required/' +  _id);
               }
                if(whatToDo === NEXT){
                res.redirect('/applicationForm/financial_info/' + _id );
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