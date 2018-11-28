const db = require("../models");

const User = db.User;
const Renter = db.Renter;
const ParkingSpot = db.ParkingSpot;

module.exports = function (app) {
  app.route("/api/parkingSpots")
    .get((req, res) => {
      ParkingSpot.find({})
        .populate("event")
        .then(parkingSpots => res.json(parkingSpots))
        .catch(err => res.json(err))
    })
    .post((req, res) => {
      const { streetaddress, city, state, zipcode, availablespots, price, instructions, event } = req.body;

      ParkingSpot.create({
        streetaddress,
        city,
        state,
        zipcode,
        availablespots,
        price,
        instructions,
        event,
        user: req.session.passport.user
      })
        .then(newPostedSpot => {
          return User.findOneAndUpdate({
            _id: req.session.passport.user
          }, {
              $push: {
                parkingspots: newPostedSpot._id
              }
            }, {
              new: true
            });
        })
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err))
    })

  app.get('/api/postedspots', (req, res) => {
    User.findOne({ _id: req.session.passport.user })
      .populate('parkingspots')
      .then(retrievedUser => res.json(retrievedUser.parkingspots))
      .catch(err => res.json(err))
  })

  app.route('/api/parkingSpots/:id/:event')
    .get((req, res) => {
      ParkingSpot.find({ event: { $all: [req.params.event] } })
        .then(matchedSpots => res.json(matchedSpots))
        .catch(err => res.json(err))
    })

  app.route('/api/parkingSpots/:id')
    .get((req, res) => {
      ParkingSpot.findOne({ _id: req.params.id })
        .then(dbParkingSpot => res.json(dbParkingSpot))
        .catch(err => res.json(err))
    })
    .delete((req, res) => {
      ParkingSpot.findByIdAndDelete({ _id: req.params.id })
        .then(dbParkingSpot => res.json(dbParkingSpot))
        .catch(err => res.json(err))
    })
    .put((req, res) => {
      ParkingSpot.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(updatedSpot => res.json(updatedSpot))
        .catch(err => res.json(err))
    })
}