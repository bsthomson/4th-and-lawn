const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
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

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
