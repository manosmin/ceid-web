var mongoose = require("mongoose");

var POISchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  types: { type: Object }
});

module.exports = mongoose.model("POI", POISchema);
