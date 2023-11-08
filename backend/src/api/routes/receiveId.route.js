const express = require("express");
const router = express.Router();
const receiveController = require("../controllers/receiveId.controller");

router.post("/", receiveController.userIdAndLocalConfigId);

module.exports = router;
