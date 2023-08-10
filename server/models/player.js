const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  username: { type: String, required: true },
  time: { type: Number, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("Player", PlayerSchema);
