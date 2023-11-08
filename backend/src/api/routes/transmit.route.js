const express = require("express");
const router = express.Router();
const transmitController = require("../controllers/transmit.controller");

router.post("/", transmitController.postTransmit);

module.exports = router;
