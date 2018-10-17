const db = require("../models");

const User = db.User;
const ParkingSpot = db.ParkingSpot;

module.exports = function (app) {

  app.route("/api/parkingspots")
    // route that finds all of the posted parking spots
    .get( (req, res) => {

      ParkingSpot.find({})
        .then( dbParkingSpot => {
          res.json(dbParkingSpot)
        })
        .catch( err => {
          res.json(err)
        })
    })
    // route that posts parking spots
    .post( (req, res) => {

      const { address, availablespots, instructions, event } = req.body;

      ParkingSpot.create({
        address: address,
        availablespots: availablespots,
        instructions: instructions,
        event: event,
        user: req.session.passport.user
      })
        .then( dbParkingSpotPoster => {
          return db.User.findOneAndUpdate({ _id: req.session.passport.user }, { $push: { parkingspots: dbParkingSpotPoster._id } }, {new: true });
        })
        .then( dbUser => {
          res.json(dbUser)
        })
        .catch( err => {
          res.json(err)
        })  
      });

  // routes that finds all of a users posted spots
  app.get('/api/postedspots', (req, res) => {
    User.find({ _id: req.session.passport.user })
      .populate('parkingspots')
      .then( dbPostedSpot => {
        res.json(dbPostedSpot)
      })
      .catch( err => {
        res.json(err)
        console.log('No Spots')
      })
  })

  // routes that delete and update parking spots
  app.route('/api/postedspots/:id')
    .delete( (req, res) => {
      ParkingSpot.findByIdAndDelete({ _id: req.params.id })
        .then( dbParkingSpot => {
          res.json(dbParkingSpot)
        })
        .catch( err => {
          res.json(err)
        })
    })
    .put( (req, res) => {
      ParkingSpot.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then( dbParkingSpot => {
          res.json(dbParkingSpot)
        })
        .catch( err => {
          res.json(err)
        })
    })
}
