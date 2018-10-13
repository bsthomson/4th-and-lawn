const db = require("../models");

const User = db.User;
const ParkingSpot = db.ParkingSpot;

module.exports = function (app) {

  // route that finds all of the posted parking spots
  app.get('/api/parkingspots', (req, res) => {

    ParkingSpot.find({})
      .then( dbParkingSpot => {
        res.json(dbParkingSpot)
      })
      .catch( err => {
        res.json(err)
      })

  })

  // route that posts parking spots
  app.post('/api/parkingspots', (req, res) => {

    const { address, availablespots, instructions } = req.body;

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

  // routes that finds all of a users posted spots
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
  
}


