const db = require("../models");
const User = db.User;
const Renter = db.Renter;
const ParkingSpot = db.ParkingSpot;
const nodemailer = require("nodemailer");


module.exports = function (app) {

  // route for posting your rental information for renting a parking spot
  app.post('/api/rentthisspot/:id', (req, res) => {
    console.log(req.body)

    const { licenseplate, make, model, date, time } = req.body;

    Renter.create({
      licenseplate: licenseplate,
      make: make,
      model: model,
      date: date,
      user: req.session.passport.user,
      parkingspot: req.params.id
    })
      .then( dbRenter => {
        console.log("User: ", dbRenter)
        User.findOneAndUpdate({ _id: req.session.passport.user }, { $push: { rentedspots: req.params.id, rentinfo: dbRenter._id } }).exec().then((user)=>{
          User.findOne({ _id: req.session.passport.user }).then(name =>{
            ParkingSpot.findOneAndUpdate({ _id: req.params.id }, { $push: { renter: req.session.passport.user, rentinfo: dbRenter._id } }).exec().then((ruse)=>{
              var spot = ParkingSpot.findOne({_id: req.params.id}).then(spot =>{
                var address = spot.address;
                var instructions = spot.instructions;
                var date = dbRenter.date;
                var firstname = name.firstname;
                var email = name.email;
                sendEmail(firstname, email, address, date, instructions);
                res.send(dbRenter);
              })
            });
          })
        });
        
        
      })
      .catch( err => {
        res.json(err)
      })
  })

  // route that gets all of the users rented spots
  app.get('/api/rentedspots', (req, res) => {
    User.find({ _id: req.session.passport.user })
      .populate('rentedspots')
      .then ( dbRentedSpot => {
        res.json(dbRentedSpot)
      })
      .catch( err => {
        res.json(err)
      })  
  })

  // route that deletes a renters info
  app.route('/api/rentedspots/:id')
    .delete( (req, res) => {
      Renter.findByIdAndDelete({ _id: req.params.id })
      .then( dbRenter => {
        res.json(dbRenter)
      })
      .catch( err => {
        res.json(err)
      })
    })
    .put( (req, res) => {
      Renter.findByIdAndUpdate({ _id: req.params.id }, req.body )
      .then( dbRenter => {
        res.json(dbRenter)
      })
      .catch( err => {
        res.json(err)
      })
    })

};
var sendEmail = function(firstname, email, address, date, instructions) {
  var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: '4thandLawnParking@gmail.com',
     pass: 'KUCodingBootcamp'
   }
 });


 var subject = "4th and Lawn Reservation Confirmation";
 var content ="<h1>Congrats " + firstname + " Your Reservation Was Succesful</h1><br>" + 
 "<h3>You reserved a spot at " + address + " on " + date + "</h3><br>" + 
"<h3>Parking Instructions: " + instructions + "</h3>";


 var mailOptions = {
   from: '4thandLawnParking@gmail.com',
   to: email,
   subject: subject,
   html: content
 };

 transporter.sendMail(mailOptions, function(error, info){
   if (error) {
     console.log(error);
   } else {
     console.log('Email sent: ' + info.response);
   }
 });
}
