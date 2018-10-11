const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ParkingSpotSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  availablespots: {
    type: Number,
    required: true
  },
  instructions: {
    type: String
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  renter: [
    {
      type: Schema.Types.ObjectId,
      ref: "Renter"
    }
  ]
});

const ParkingSpot = mongoose.model("ParkingSpot", ParkingSpotSchema);

module.exports = ParkingSpot;