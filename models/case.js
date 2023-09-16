var mongoose = require("mongoose");
var CaseSchema = new mongoose.Schema({
  username: { type: String },
  date: { type: Date },
});
module.exports = mongoose.model("Case", CaseSchema);
