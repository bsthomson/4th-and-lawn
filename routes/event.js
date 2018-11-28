const db = require("../models");
const Event = db.Event;

module.exports = function (app) {
  app.route("/api/event")
    // route that finds all events
    .get((req, res) => {
      console.log('Get all events');

      Event.find({})
        .then(allEvents => {
          res.json(allEvents)
        })
        .catch(err => {
          res.json(err)
        })
    })
    .post((req, res) => {
      const { location, name, shortName, date } = req.body

      Event.create({
        location,
        name,
        shortName,
        date
      })
        .then(newEvent => {
          res.json(newEvent)
        })
        .catch(err => {
          res.json(err)
        })
    })

  app.route("/api/event/:id")
    .get((req, res) => {
      Event.findOne(
        { _id: req.params.id })
        .then(event => {
          res.json(event)
        })
        .catch(err => {
          res.json(err)
        })
    })
}