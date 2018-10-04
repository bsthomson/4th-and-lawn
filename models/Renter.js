const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RenterSchema = new Schema({
  licenseplate: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Number
  }
})

const Renter = mongoose.model("Renter", RenterSchema);

model.exports = Renter;