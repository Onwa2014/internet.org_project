var MongoClient = require('mongodb').MongoClient;
 //var io = require('socket.io');
 mongodb = require('mongodb')

 var ObjectId = mongodb.ObjectId;

module.exports = function(url){
  
  this.fin_info = fin_info;
  this.financial_infoWithData = financial_infoWithData;

  function fin_info(req,res,next) {

  var _id = req.params.id;

  console.log("yolanda");
  console.log(req.body);
  console.log(_id);
    
    var applicationFields = {
        financial_support : req.body.financial_supp,
        route:process.env.FREEBASICS_URL+req.path,
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
    function financial_infoWithData(req,res,next){

  var route = req.path;
  console.log(route);
  
  var _id = req.params.id;


  MongoClient.connect(url, function(err, db){
      if(err){
        console.log(err,"\n");
      }
      else{
        var applications = db.collection('applications');   
        // what I am looking for...
        applications.findOne({ _id : ObjectId(_id)  }, function(err, data){
            
          if(err)
            return next(err);
          

          // we default to no financial support needed
          data.financialSupportYes = "";
          data.financialSupportNo  = "checked";

          if(data.financial_support === 'yes'){
            data.financialSupportYes = "checked";
            data.financialSupportNo  = "";
          }

          res.render('financial_info', data);
          //cleanup
          db.close();
          return;
        }); 
      }
  });
};
}
