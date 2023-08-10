const Player = require("../models/player");
const asyncHandler = require("express-async-handler");

exports.leaderboard_get = asyncHandler(async (req, res, next) => {
  const leaderboard = await Player.find({ board: req.params.id })
    .sort({
      time: 1,
    })
    .exec();
  res.json(leaderboard);
});

exports.leaderboard_post = asyncHandler(async (req, res, next) => {});
