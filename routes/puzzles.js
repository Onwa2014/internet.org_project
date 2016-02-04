var MongoClient = require('mongodb').MongoClient;
var nodemailer = require('nodemailer');
 //var io = require('socket.io');
 mongodb = require('mongodb')

 var ObjectId = mongodb.ObjectId;

module.exports = function(url){
  this.puzzles = puzzles;

function puzzles(req,res,next){
  var _id = req.params.id;

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

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: process.env.NODEMAILER_SERVICE,
      auth: {
      user: process.env.basic_app,
      pass: process.env.basic_app_key
      }
});
// /*------------------SMTP Over------------------/
var mailOptions = {
      from: 'Attention!!! link ✔ <oyama@projectcodex.co>', // sender address
      to: "cara@projectcodex.co", // list of receivers
      subject: 'Link!!!  ✔', // Subject line
      // text: route + '✔', // plaintext body
      html: '<b>applicant"s name have submitted the form ✔</b>' // html body
};
// now sending email by using transporter functions methods
    smtpTransport.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
          console.log('Message sent: ' + info.response);
    });
                res.redirect('/');
            })
            .catch(function(err){
                // log the error to the console for now
                console.log(err);
                res.send(err.stack);
            });
    });
  };
};