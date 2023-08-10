const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  name: { type: String, required: true },
  imgURL: { type: String, required: true },
});

module.exports = mongoose.model("Board", BoardSchema);
