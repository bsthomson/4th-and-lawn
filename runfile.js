const mongoose = require("mongoose");

const db = require("./models")
const Event = db.Event
const User = db.User
const Renter = db.Renter
const ParkingSpot = db.Renter

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/4th-and-lawn";

mongoose.Promise = Promise;

insertEvent = () => {
  mongoose.connect(MONGODB_URI)
    .then( () => console.log("Mongodb connection successful"))
    .then( () => {
      Event.insertMany([
        {
          address: "1101 Mississippi St, Lawrence, KS 66044",
          event: "KU Hosting Nicholls 6 P.M. Kickoff",
          date: "09/01/2018"
        },
        {
          address: "1101 Mississippi St, Lawrence, KS 66044",
          event: "KU Hosting Rutgers 11 A.M. Kickoff",
          date: "09/15/2018"
        },
        {
          address: "1101 Mississippi St, Lawrence, KS 66044",
          event: "KU Hosting OSU 11 A.M. Kickoff",
          date: "09/29/2018"
        },
        {
          address: "1101 Mississippi St, Lawrence, KS 66044",
          event: "KU Hosting TCU TBA Kickoff",
          date: "10/27/2018"
        },
        {
          address: "1101 Mississippi St, Lawrence, KS 66044",
          event: "KU Hosting ISU TBA Kickoff",
          date: "11/03/2018"
        },
        {
          address: "1101 Mississippi St, Lawrence, KS 66044",
          event: "KU Hosting TU 11 A.M. Kickoff",
          date: "11/23/2018"
        }
      ]) 
    })
    .then( () => Event.find().then( response => console.log(response)))
    .then( () => mongoose.disconnect(MONGODB_URI))
    .then( () => console.log("Event info inserted!"))
    .catch( err => console.error(err));
}

dropDb = () => {
  mongoose.connect(MONGODB_URI)
    .then( () => console.log("Mongodb connection successful"))
    .then( () => mongoose.connection.db.dropDatabase())
    .then( () => mongoose.disconnect(MONGODB_URI))
    .then( () => console.log("Database Dropped!"))
    .catch( err => console.log(err))
}

dropModels = () => {
  mongoose.connect(MONGODB_URI)
  .then( () => console.log("Mongodb connection successful"))
  .then( () => Event.deleteMany({ address: "1101 Mississippi St, Lawrence, KS 66044"}).then( response => console.log("Event Removed!", response)).then( err => console.log(err)))
  .then( () => Renter.deleteMany().then( response => console.log("Renter Removed!", response)).then( err => console.log(err)))
  .then( () => User.deleteMany().then( response => console.log("User Removed!", response)).then( err => console.log(err)))
  .then( () => ParkingSpot.deleteMany().then( response => console.log("ParkingSpot Removed!", response)).then( err => console.log(err)))
  .then( () => mongoose.disconnect(MONGODB_URI))
  .then( () => console.log("Collections Removed!"))
  .catch( err => console.log(err))
}

restartDb = () => {
  dropModels()
    .then( insertEvent())
    .catch( err => (console.log(err)))
}

module.exports = {
  insertEvent,
  dropDb,
  dropModels,
  restartDb
}