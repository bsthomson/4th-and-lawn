const db = require("../models");

const User = db.User;
const ParkingSpot = db.ParkingSpot;

module.exports = function (app) {

  app.get('/api/parkingspots', (req, res) => {

    ParkingSpot.find({})
      .then( dbParkingSpot => {
        res.json(dbParkingSpot)
      })
      .catch( err => {
        res.json(err)
      })

  })

  app.post('/api/parkingspots', (req, res) => {

    const { address, availablespots, instructions, game } = req.body;

    ParkingSpot.create({
      address: address,
      availablespots: availablespots,
      instructions: instructions,
      user: req.session.passport.user
    })
      .then( dbParkingSpotPoster => {
        return db.User.findOneAndUpdate({ _id: req.session.passport.user }, { $push: { parkingspots: dbParkingSpotPoster._id } }, {new: true });
      })
      .then( dbUser => {
        console.log("sent: ", dbUser);
        res.json(dbUser)
      })
      .catch( err => {
        res.json(err)
      })  
    });

  app.get('/api/postedspots', (req, res) => {
    User.find({ _id: req.session.passport.user })
      .populate('parkingspots')
      .then( dbPostedSpot => {
        res.json(dbPostedSpot)
        console.log('Got The Spots')
        console.log(dbPostedSpot)
      })
      .catch( err => {
        res.json(err)
        console.log('No Spots')
      })
  })
  
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
}


