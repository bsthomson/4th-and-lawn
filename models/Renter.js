const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RenterSchema = new Schema({
  licenseplate: {
    type: String
  },
  make: {
    type: String
  },
  model: {
    type: String
  },
  date: {
    type: Date
  },
  time: {
    type: String
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  parkingspot: [
    {
      type: Schema.Types.ObjectId,
      ref: "ParkingSpot"
    }
  ]
})

const Renter = mongoose.model("Renter", RenterSchema);

module.exports = Renter;