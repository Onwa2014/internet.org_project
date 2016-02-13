var MongoClient = require('mongodb').MongoClient;
var nodemailer = require('nodemailer');
 //var io = require('socket.io');
 mongodb = require('mongodb')

 var ObjectId = mongodb.ObjectId;

module.exports = function(url,id){
      this.puzzles = puzzles;

      function sendUserMail(id, cb){

        var smtpTransport = nodemailer.createTransport("SMTP",{
                    service: process.env.NODEMAILER_SERVICE,
                      auth: {
                      user: process.env.basic_app,
                      pass: process.env.basic_app_key
                      }
                });

          // call the database here... get the current applicant information from the id supplied
          
        // /*------------------SMTP Over------------------/
          var mailOptions = {
              from: applicationFields.email_address, // sender address
              to:'<oyama@projectcodex.co>, onwaba@projectcodex.co', // list of receivers
              subject:'application Submition ✔', // Subject line
              html: '<p>The form has been completed by: !<p>✔'/*+applicationFields.first_name+'!<p>✔'*/ // html body
          };
                // now sending email by using transporter functions methods
            smtpTransport.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

      }

      function puzzles(req,res,next){
        var _id = req.params.id;
        var route = req.path;

            console.log("milonie");
            console.log(req.body);
            console.log(_id);

          var applicationFields = {
            puzzle1 : req.body.puzzle1,
            puzzle2 : req.body.puzzle2,
            heard_about_codex: req.body.heard_about_codex,
            application_status:req.body.application_status,
            route:process.env.FREEBASICS_URL+req.path,
          };

          MongoClient.connect(url, function(err, db) {
              var applications = db.collection('applications');
              applications
                  .updateOne( { _id : ObjectId(_id) }, {$set : applicationFields})
                    .then(function(result){
                        sendUserMail(id, function(){
                          res.redirect('/');    
                        });
                      
                  })
                  .catch(function(err){
                      // log the error to the console for now
                      console.log(err);
                      res.send(err.stack);
                  });
          });
        };
};