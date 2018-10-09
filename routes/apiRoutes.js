const db = require("../models");
const Renter = db.Renter;
const ParkingSpot = db.ParkingSpot;

module.exports = function (app) {

  // Posts login information to passport
  app.post('/api/rentedspots', (req, res) => {

    const { licenseplate, make, model, date, time } = req.body;

    Renter.create({
      licenseplate: licenseplate,
      make: make,
      model: model,
      date: date,
      time: time
    })
      .then( dbRenter => {
        return db.User.findOneAndUpdate({ _id: req.session.passport.user }, { $push: { rentedspots: dbRenter._id } }, { new: true });
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

    ParkingSpot.create({
      address: address,
      availablespots: availablespots,
      destination: destination,
      instructions: instructions,
      date: date,
      time: time
    })
  });
}
