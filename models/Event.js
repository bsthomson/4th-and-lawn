const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  location: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  shortName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
