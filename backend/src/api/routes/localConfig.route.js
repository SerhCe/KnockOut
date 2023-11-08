const express = require("express");
const router = express.Router();
const localConfigController = require("../controllers/localConfig.controller");

router.get("/", localConfigController.getAllLocalConfigs);
router.get("/:id", localConfigController.getLocalConfigById);
router.post("/", localConfigController.createLocalConfig);
router.put("/:id", localConfigController.updateLocalConfig);
router.delete("/:id", localConfigController.deleteLocalConfig);

module.exports = router;
