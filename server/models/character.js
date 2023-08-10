const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  imgURL: { type: String, required: true },
  board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
  coords: { type: String, required: true },
});

module.exports = mongoose.model("Character", CharacterSchema);
