const mongoose = require("mongoose");

const db = require("./models")
const Event = db.Event
const User = db.User
const Renter = db.Renter
const ParkingSpot = db.Renter

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/4th-and-lawn";
const eventController = require('./controllers/Event');

mongoose.Promise = Promise;

insertEvents = () => {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("Mongodb connection successful"))
    .then(() => {
      eventController.getTeamSchedule('Kansas Jayhawks', events => {
        events.forEach(eventData => {
          Event.create(eventData)
            .catch(err => {
              console.log(err);
            })
        })

      })
    })
    .then(() => Event.find().then(response => console.log(response)))
    .then(() => mongoose.disconnect(MONGODB_URI))
    .then(() => console.log("Event info inserted!"))
    .catch(err => console.error(err));
}

dropDb = () => {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("Mongodb connection successful"))
    .then(() => mongoose.connection.db.dropDatabase())
    .then(() => mongoose.disconnect(MONGODB_URI))
    .then(() => console.log("Database Dropped!"))
    .catch(err => console.log(err))
}

dropModels = () => {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("Mongodb connection successful"))
    .then(() => Event.deleteMany({ address: "1101 Mississippi St, Lawrence, KS 66044" }).then(response => console.log("Event Removed!", response)).then(err => console.log(err)))
    .then(() => Renter.deleteMany().then(response => console.log("Renter Removed!", response)).then(err => console.log(err)))
    .then(() => User.deleteMany().then(response => console.log("User Removed!", response)).then(err => console.log(err)))
    .then(() => ParkingSpot.deleteMany().then(response => console.log("ParkingSpot Removed!", response)).then(err => console.log(err)))
    .then(() => mongoose.disconnect(MONGODB_URI))
    .then(() => console.log("Collections Removed!"))
    .catch(err => console.log(err))
}

restartDb = () => {
  dropModels()
    .then(insertEvents())
    .catch(err => (console.log(err)))
}

module.exports = {
  insertEvents,
  dropDb,
  dropModels,
  restartDb
}