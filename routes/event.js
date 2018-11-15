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
      const { address, event, date } = req.body

      Event.create({
        address: address,
        event: event,
        date: date
      })
        .then(newEvent => {
          res.json(newEvent)
        })
        .catch(err => {
          res.json(err)
        })
    })
}