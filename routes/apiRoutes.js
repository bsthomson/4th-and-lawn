const db = require("../models");
const Renter = db.Renter;
const ParkingSpot = db.ParkingSpot;

module.exports = function (app) {

  // Posts login information to passport
  app.post('/rent', (req, res) => {

    const { licenseplate, make, model, date, time } = req.body;

    Renter.create({
      licenseplate: licenseplate,
      make: make,
      model: model,
      date: date,
      time: time
    })
  });

  app.post('/parkingspot', (req, res) => {

    const { address, availablespots, instructions, game } = req.body;

    ParkingSpot.create({
      address: address,
      availablespots: availablespots,
      instructions: instructions,
      game: game
    })
  });



}
