const Character = require("../models/character");
const asyncHandler = require("express-async-handler");

exports.characters_list = asyncHandler(async (req, res, next) => {
  const characters = await Character.find({
    board: req.params.id,
  }).exec();
  res.json(characters);
});
