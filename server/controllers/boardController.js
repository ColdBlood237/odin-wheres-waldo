const Board = require("../models/board");
const asyncHandler = require("express-async-handler");

exports.boards_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: GET boards list");
});

exports.board_get = asyncHandler(async (req, res, next) => {
  const board = await Board.findOne({ name: "PS2" }).exec();
  res.json(board);
});
