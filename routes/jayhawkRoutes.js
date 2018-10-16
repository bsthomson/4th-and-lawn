const db = require("../models");

const Jayhawk = db.Jayhawk;

module.exports = function (app) {

  app.route("/api/jayhawk")
    // route that finds all jayhawk games
    .get( (req, res) => {

      Jayhawk.find({})
        .then( dbJayhawk => {
          res.json(dbJayhawk)
        })
        .catch( err => {
          res.json(err)
        })
    })
    .post( (req, res) => {
      
      const { address, event, date } = req.body

      Jayhawk.create({
        address: address,
        event: event,
        date: date
      })
        .then( dbJayhawk => {
          res.json(dbJayhawk)
        })
        .catch( err => {
          res.json(err)
        })
    })
}