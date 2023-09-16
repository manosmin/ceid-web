var mongoose = require("mongoose");
var VisitSchema = new mongoose.Schema({
  username: { type: String },
  timestamp: { type: Date },
  people_estimate: {type: Number},
  name: {type: String},
  id: {type: String}
});
module.exports = mongoose.model("Visit", VisitSchema);
