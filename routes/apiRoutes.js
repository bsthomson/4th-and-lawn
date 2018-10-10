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
  app.post('/parkingspots/:id', (req, res) => {

    const { licenseplate, make, model, date, time } = req.body;

    Renter.create({
      licenseplate: licenseplate,
      make: make,
      model: model,
      date: date,
      time: time
    })
      .then( dbRenter => {
        return User.findOneAndUpdate({ _id: req.session.passport.user }, { $push: { rentedspots: dbRenter._id } }, { new: true });
      })
      .then( dbParkingSpot => {
        return ParkingSpot.findOneAndUpdate({ _id: req.params.id }, { $push: { renter: dbParkingSpot._id } }, { new: true });
      })
      .then( dbUser => {
        res.json(dbUser)
      })
      .catch( err => {
        res.json(err)
      })
  });

  app.post('/api/parkingspots', (req, res) => {

    const { address, availablespots, destination, instructions, date, time } = req.body;

    db.ParkingSpot.create({
      address: address,
      availablespots: availablespots,
      destination: destination,
      instructions: instructions,
      date: date,
      time: time
    })
      // .then( dbParkingSpotPoster => {
      //   return db.User.findOneAndUpdate({ _id: req.session.passport.user }, { $push: { parkingspots: dbParkingSpotPoster._id } }, {new: true });
      // })
      .then( dbUser => {
        console.log("sent: ", dbUser);
        res.json(dbUser)
      })
      .catch( err => {
        res.json(err)
      })
  });
}
