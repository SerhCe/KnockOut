const express = require("express");
const router = express.Router();
const orderItemsController = require("../controllers/orderItems.controller");

router.get("/", orderItemsController.getAllOrderItems);
router.get("/:id", orderItemsController.getOrderItemById);
router.post("/", orderItemsController.createNewOrderItem);
router.put("/:id", orderItemsController.updateOrderItem);
router.delete("/:id", orderItemsController.deleteOrderItem);

module.exports = router;
