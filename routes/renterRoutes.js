const db = require("../models");

const User = db.User;
const Renter = db.Renter;
const ParkingSpot = db.ParkingSpot

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
      time: time,
      user: req.session.passport.user,
      parkingspot: req.params.id
    })
      .then(dbRenter => {
        console.log("User: ", dbRenter)
        User.findOneAndUpdate({ _id: req.session.passport.user }, { $push: { rentedspots: req.params.id, rentinfo: dbRenter._id } }).exec();
        ParkingSpot.findOneAndUpdate({ _id: req.params.id }, { $push: { renter: req.session.passport.user, rentinfo: dbRenter._id } }).exec();
        res.send(dbRenter)
      })
      .catch( err => {
        res.json(err)
      })
  });

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

};
