const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    validate: {
      validator: v => {
        return /.+?@.+?\w{2,3}/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  phonenumber: {
    type: Number,
    min: 10,
    max: 10
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

const User = mongoose.model("User", UserSchema);

module.exports = User;
