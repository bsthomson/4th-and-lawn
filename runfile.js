const mongoose = require("mongoose");

const Jayhawk = require("./models/Jayhawk")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/4th-and-lawn";

mongoose.Promise = Promise;

insertJayhawk = () => {
  mongoose.connect(MONGODB_URI)
    .then( () => console.log("Mongodb connection successful"))
    .then( () => {
      Jayhawk.insertMany([
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
    .then( () => Jayhawk.find().then( response => console.log(response)))
    .then( () => mongoose.disconnect(MONGODB_URI))
    .then( () => console.log("Jayhawk info inserted!"))
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

module.exports = {
  insertJayhawk,
  dropDb
}