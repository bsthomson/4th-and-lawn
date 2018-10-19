const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ParkingSpotSchema = new Schema({
  streetaddress: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipcode: {
    type: String
  },
  availablespots: {
    type: Number
  },
  instructions: {
    type: String
  },
  price: {
    type: Number
  },
  event: [
    {
    type: Schema.Types.ObjectId,
    ref: "Jayhawk"
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
      ref: "Renter"
    }
  ],
  rentinfo: [
    {
      type: Schema.Types.ObjectId,
      ref: "RentInfo"
    }
  ]
});

const ParkingSpot = mongoose.model("ParkingSpot", ParkingSpotSchema);

module.exports = ParkingSpot;