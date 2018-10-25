const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ParkingSpotSchema = new Schema({
  streetaddress: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  availablespots: {
    type: Number,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  event: [
    {
    type: Schema.Types.ObjectId,
    ref: "Jayhawk",
    required: true
    }
  ],
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  renter: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  rentinfo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Renter"
    }
  ]
});

const ParkingSpot = mongoose.model("ParkingSpot", ParkingSpotSchema);

module.exports = ParkingSpot;