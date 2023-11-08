const express = require("express");
const router = express.Router();
const configurationsController = require("../controllers/configuration.controller");

router.get("/", configurationsController.getAllConfigurations);
router.get("/:id", configurationsController.getConfigurationById);
router.post("/", configurationsController.createConfiguration);
router.put("/:id", configurationsController.updateConfiguration);
router.delete("/:id", configurationsController.deleteConfiguration);

module.exports = router;
