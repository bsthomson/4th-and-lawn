const db = require("../models");
const Renter = db.Renter;
const ParkingSpot = db.ParkingSpot;
const User = db.User;

module.exports = function (app) {

  app.get('/parking-spots', (req, res) => {
    const { address, availablespots, destination, instructions, date, time } = req.body

    ParkingSpot.find({})
      .then( dbParkingSpot => {
        res.json(dbParkingSpot)
      })
      .catch( err => {
        res.json(err)
      })

  })

  // Posts login information to passport
  app.post('/parking-spots/:id', (req, res) => {

    const { licenseplate, make, model, date, time } = req.body;

    Renter.create({
      licenseplate: licenseplate,
      make: make,
      model: model,
      date: date,
      time: time,
      user: req.passport.session.user,
      parkingspot: req.params._id
    })
      .then( dbRenter => {
        return User.findOneAndUpdate({ _id: req.session.passport.user }, { $push: { rentedspots: dbRenter._id } }, { new: true });
      })
      .then( () => {
        return ParkingSpot.findOneAndUpdate({ _id: req.params.id }, { $push: { renter: req.session.passport.user } }, { new: true });
      })
      .then( dbUser => {
        res.json(dbUser)
      })
      .catch( err => {
        res.json(err)
      })
  });

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

  app.get('/api/parkingspots', (req, res) => {
    User.find({ user: req.session.passport.user })
      .populate('parkingspots')
      .then( dbPostedSpot => {
        res.json(dbPostedSpot)
      })
      .catch( err => {
        res.json(err)
      })
  })
  
  app.get('/api/rentedspots', (req, res) => {
    User.find({ user: req.session.passport.user })
      .populate('rentedspots')
      .then ( dbRentedSpot => {
        res.json(dbRentedSpot)
      })
      .catch( err => {
        res.json(err)
      })
  
  })
}


