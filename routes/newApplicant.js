var MongoClient = require('mongodb').MongoClient;
 //var io = require('socket.io');
 mongodb = require('mongodb')

 var nodemailer = require('nodemailer');
 var ObjectId = mongodb.ObjectId;
 
 //Connect to mongodb [ConnectionURL]
 var url = 'mongodb://localhost:27017/free_basics';
  console.log("Onwaba");
  //console(req.body);
 
 exports.application = function(req, res, next){

 	console.log(req.body)
  var _id = req.params.id;
  
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

 exports.question1WithData = function(req,res,next){

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

          console.log(data);
           // we default all the buttons to no
          data.codingExperienceNo = "";
          data.codingExperienceYesAbit  = "";
          data.codingExperienceNoYesQuite  = "";
          


          if(data.got_experience === 'No,not yet'){
            data.codingExperienceNo = "checked";
          }
          else if(data.got_experience === 'Yes, a little'){
            data.codingExperienceYesAbit  = "checked";

          }
          else if(data.got_experience === 'Yes,quite a bit'){
            data.codingExperienceNoYesQuite  = "checked";
          }

          res.render('question1', data);
          db.close();
          return;
        }); 
      }
  });
};



 exports.question2 = function(req, res, next){
  var _id = req.params.id;
  var route = req.path;
    console.log(process.env.FREEBASICS_URL + route)
    console.log("zonke");
    console.log(req.body);
    console.log(_id);

    // check which button was pressed

    var whatToDo = "";

    var NEXT = "nextScreen";
    var SAVE_FOR_LATER = "saveForLater";
    var BACK = "previousPage";

    if (req.body.nextBtn !== undefined ){'[;/l.'
      console.log("next button pressed");
      whatToDo = NEXT;
    }
    else if (req.body.saveForLaterBtn !== undefined){
      console.log("save for later button pressed")
      whatToDo = SAVE_FOR_LATER;
    }
    else if(req.body.backBtn !== undefined){
      console.log("back button pressed")
      whatToDo = BACK;
    }

    var applicationFields = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        id_number: req.body.id_number,
        email_address: req.body.email_address,
        phone_number: req.body.phone_number,
        dateofbirth: req.body.date_of_birth,
        city: req.body.city,
        education_and_experience: req.body.education_and_experience,
        ref_name_and_surname: req.body.ref_name_and_surname,
        ref_email_add: req.body.ref_email_add,
        ref_phone_number: req.body.ref_phone_number,
        relationship: req.body.relationship,
        relationshipOtherName: req.body.relationshipOtherName,
        route: process.env.FREEBASICS_URL+req.path,
        application_status: "In Progress"
    };

    MongoClient.connect(url, function(err, db) {
        var applications = db.collection('applications');
        applications
            .updateOne( { _id : ObjectId(_id) }, {$set : applicationFields})
            .then(function(result){

              if(whatToDo === NEXT){
                res.redirect('/applicationForm/financial_info/' + _id );
              }
              else if(whatToDo === BACK){
                res.redirect('/applicationForm/:id')
              }
              else{

        var smtpTransport = nodemailer.createTransport("SMTP",{
            service: process.env.NODEMAILER_SERVICE,
              auth: {
              user: process.env.basic_app,
              pass: process.env.basic_app_key
              }
        });
// /*------------------SMTP Over------------------/
  var mailOptions = {
      from: '<oyama@projectcodex.co>', // sender address
      to: applicationFields.email_address +','+'onwaba@projectcodex.co', // list of receivers
      subject:'Link ✔', // Subject line
      text: 'Make sure you keep this in order to continue with the form ✔', // plaintext body
      html: '<b>Continue to fill in the form by using the url!</b>'+'<br><br>'+process.env.FREEBASICS_URL+route+' ✔' // html body
  };
        // now sending email by using transporter functions methods
    smtpTransport.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
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
 exports.update = function(req,res,next){
 
  // var inputData = JSON.parse(JSON.stringify(req.body));
  // console.log(req.body);
  console.log("Aphelele")
 };


 exports.question2WithData = function(req,res,next){

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

          console.log(data);
           // we default to no financial support needed
          data.relationshipMentor = "";
          data.relationshipTeacher  = "";
          data.relationshipEmployer  = "";
          data.relationshipOther  = "";


          if(data.relationship === 'mentor'){
            data.relationshipMentor = "checked";
          }
          else if(data.relationship === 'teacher'){
            data.relationshipTeacher  = "checked";

          }
          else if(data.relationship === 'employer'){
            data.relationshipEmployer  = "checked";
          }
          else if(data.relationship === 'other'){
            data.relationshipOther  = "checked";
            data.relationshipOtherName = data.relationshipOtherName;
          }

          res.render('question2', data);
          db.close();
          return;
        }); 
      }
  });
};

exports.previousPage = function(req,res, next){
  var route = req.path;
    var _id = req.params.id;
  MongoClient.connect(url, function(err,db){
    if(err){
      console.log(err,"\n");
    }

    var applications = db.collection('applications');

    //find all the fields from previous page
    applications.find(ObjectId 
       //"got_experience":1,
       //"experience":1,
       //"codecademyEmail":1
    );
    db.close();
    return res.render("applicationForm/" + _id)
  })
};
    
 

