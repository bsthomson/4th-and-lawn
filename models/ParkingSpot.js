const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ParkingSpotSchema = new Schema({
  address: {
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