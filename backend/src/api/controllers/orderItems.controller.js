var OrderItemsModel = require("../models/orderItems.model").OrderItems;
var UpdatedOrderItemsModel =
  require("../models/orderItems.model").UpdatedOrderItems;

exports.getAllOrderItems = (req, res) => {
  OrderItemsModel.getAllOrderItems((err, orderitems) => {
    if (err) {
      res.status(400);
      res.json({
        message: "Error while accessing data",
      });
    } else {
      console.log("Order Items", orderitems);
      res.send(orderitems);
    }
  });
};

exports.getOrderItemById = (req, res) => {
  OrderItemsModel.getOrderItemById(req.params.id, (err, orderitem) => {
    if (err) res.send(err);
    console.log("Single Order Item data", orderitem);
    res.send(orderitem);
  });
};

exports.createNewOrderItem = (req, res) => {
  const orderItemReqData = new OrderItemsModel(req.body);
  console.log("orderItemReqData", orderItemReqData);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.sendStatus(400).send({ message: "Please fill all fields" });
  } else {
    OrderItemsModel.createOrderItem(orderItemReqData, (err, orderitem) => {
      if (err) {
        res.status(400);
        res.json({
          message: "Error while inserting data",
        });
      } else {
        res.json({
          message: "Order Item Created Successfully",
          data: orderitem.insertId,
        });
      }
    });
  }
};

exports.updateOrderItem = (req, res) => {
  const orderItemReqData = new UpdatedOrderItemsModel(req.body);
  console.log("orderReqData update", orderItemReqData);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .sendStatus(400)
      .send({ success: false, message: "Please fill all fields" });
  } else {
    UpdatedOrderItemsModel.updateOrderItem(
      req.params.id,
      orderItemReqData,
      (err) => {
        if (err) {
          res.status(400);
          res.json({
            message: "Error while updating data",
          });
        } else {
          res.json({
            message: "Order Item updated Successfully",
          });
        }
      }
    );
  }
};

exports.deleteOrderItem = (req, res) => {
  OrderItemsModel.deleteOrderItem(req.params.id, (err) => {
    if (err) {
      res.status(400);
      res.json({
        message: "Error while deleting data",
      });
    } else {
      res.json({ message: "Order Item deleted successully!" });
    }
  });
};
