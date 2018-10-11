const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String
    // required: true
  },
  lastname: {
    type: String
    // required: true
  },
  phonenumber: {
    type: Number
    // required: true
  },
  rentinfo: [
    {
      type: Schema.Types.ObjectId,
      ref: "RentInfo"
    }
  ],
  rentedspots: [
    {
      type: Schema.Types.ObjectId,
      ref: "Renter"
    }
  ],
  parkingspots: [
    {
      type: Schema.Types.ObjectId,
      ref: "ParkingSpot"
    }
  ]
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

module.exports = User;
