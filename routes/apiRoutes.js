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
