const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
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
  rentedspaces: [
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
