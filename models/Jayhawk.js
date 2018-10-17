const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JayhawkSchema = new Schema({
  address: {
    type: String
  },
  event: {
    type: String
  },
  date: {
    type: Date
  }
});

const Jayhawk = mongoose.model("Jayhawk", JayhawkSchema);

module.exports = Jayhawk;
