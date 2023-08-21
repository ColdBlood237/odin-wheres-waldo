const Player = require("../models/player");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.leaderboard_get = asyncHandler(async (req, res, next) => {
  const leaderboard = await Player.find({ board: req.params.id })
    .sort({
      time: 1,
    })
    .exec();
  res.json(leaderboard);
});

exports.leaderboard_post = [
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("time").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newPlayer = new Player({
      username: req.body.username,
      time: req.body.time,
      board: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.json(errors.array());
    } else {
      const usernameExists = await Player.findOne({
        username: req.body.username,
      }).exec();
      if (usernameExists) {
        res.status(400).send("Username already used.");
      } else {
        await newPlayer.save();
        res.redirect(`/${req.params.id}/leaderboard`);
      }
    }
  }),
];
