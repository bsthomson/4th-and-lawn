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
  destination: {
    type: String,
    required: true
  },
  instructions: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Number,
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const ParkingSpot =mongoose.model("ParkingSpot", ParkingSpotSchema);

module.exports = ParkingSpot;