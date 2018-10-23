const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JayhawkSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Jayhawk = mongoose.model("Jayhawk", JayhawkSchema);

module.exports = Jayhawk;
