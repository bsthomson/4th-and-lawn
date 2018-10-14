const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JayhawkSchema = new Schema({
  address: {
    type: String
  },
  event: {
    type: String
  },
  hometeam: {
    type: String
  },
  date: {
    type: date
  }
});

const ParkingSpot = mongoose.model("Jayhawk", JayhawkSchema);

module.exports = ParkingSpot;