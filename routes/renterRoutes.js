const axios = require("axios");
const db = require("../models");
const nodemailer = require("nodemailer");
const User = db.User;
const Renter = db.Renter;
const ParkingSpot = db.ParkingSpot
const moment = require("moment");

module.exports = function (app) {

  // route for posting your rental information for renting a parking spot
  app.route('/api/rentthisspot/:id')
    .post( (req, res) => {
      
      ParkingSpot.findById({ _id: req.params.id })
        .then( dbParkingSpot => {
          return event = dbParkingSpot.event
        })
        .then( () => {
          const { licenseplate, make, model } = req.body;

          // console.log(event.date)

          Renter.create({
            licenseplate: licenseplate,
            make: make,
            model: model,
            user: req.session.passport.user,
            event: event,
            parkingspot: req.params.id,
          })
          .then( dbRenter => {
            // console.log("User: ", dbRenter)
            User.findOneAndUpdate({ _id: req.session.passport.user }, { $push: { rentedspots: req.params.id, rentinfo: dbRenter._id } }).exec().then((user) => {
              User.findOne({ _id: req.session.passport.user }).then(name =>{
                ParkingSpot.findOneAndUpdate({ _id: req.params.id }, { $push: { renter: req.session.passport.user, rentinfo: dbRenter._id } }).exec().then((ruse) => {
                  ParkingSpot.findOne({_id: req.params.id}).populate('event').then((spot) => {
                    var streetaddress = spot.streetaddress;
                    var instructions = spot.instructions;
                    var event = moment(spot.event[0].date).format("dddd, MMMM Do YYYY");
                    var firstname = name.firstname;
                    var email = name.email;
                    sendEmail(firstname, email, streetaddress, event, instructions);
                  });
                });
              });
            });
            
            res.send(dbRenter);
          })
          .catch( err => {
            res.json(err)
          })
        })
        .catch ( err => {
          res.json(err)
        })
    })
    .get( (req, res) => {
      ParkingSpot.findOne({ _id: req.params.id})
        .populate("event")
        .then( dbParkingSpot => {
            
          res.json(dbParkingSpot)
        })
        .catch( err => {
          res.json(err)
        })
    })

  // route that gets all of the users rented spots
  app.get('/api/rentedspots', (req, res) => {
    User.find({ _id: req.session.passport.user })
      .populate("rentinfo")
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

    var sendEmail = function(firstname, email, streetaddress, event, instructions) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '4thandLawnParking@gmail.com',
          pass: 'KUCodingBootcamp'
        }
      });

      var subject = "4th and Lawn Reservation Confirmation";
      var content =`<h1>Congrats ${firstname} Your Reservation Was Succesful</h1><br> <h3>You reserved a spot at ${streetaddress} on ${event}</h3><br> <h3>Parking Instructions: ${instructions}</h3>`;

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

    app.route('/api/rentedspots/distance').get((req, res)=>{
      // console.log("inside app.route", req);
      var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + req.query.origin + "&destinations=" + req.query.destination + "&key=AIzaSyCMQAxD4bwQmzLZNVUGgc_wy6q7Bk6kbo4&mode=walking";
        axios.get(queryURL).then((ggl) =>{
          console.log("@@@@", ggl.data.rows[0].elements[0])
            res.json(ggl.data.rows[0].elements[0].duration.text)
          // })
        })
    })
};