const express = require("express");
const router = express.Router();
const board_controller = require("../controllers/boardController");
const character_controller = require("../controllers/characterController");
const player_controller = require("../controllers/playerController");

router.get("/", board_controller.boards_list);

router.get("/:id", board_controller.board_get);

router.get("/:id/characters", character_controller.characters_list);

router.get("/:id/leaderboard", player_controller.leaderboard_get);

router.post("/:id/leaderboard", player_controller.leaderboard_post);

module.exports = router;
