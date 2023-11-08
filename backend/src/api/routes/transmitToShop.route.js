const express = require("express");
const router = express.Router();
const transmitToShopController = require("../controllers/transmitToShop.controller");

router.post("/", transmitToShopController.postToWebshop);

module.exports = router;
