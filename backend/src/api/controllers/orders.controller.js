var OrderModel = require("../models/orders.model").Orders;
var UpdatedOrderModel = require("../models/orders.model").UpdatedOrders;

exports.getAllOrders = (req, res) => {
  OrderModel.getAllOrders((err, orders) => {
    if (err) {
      res.status(400);
      res.json({
        message: "Error while inserting data",
      });
    } else {
      console.log("Orders", orders);
      res.send(orders);
    }
  });
};

exports.getOrderById = (req, res) => {
  OrderModel.getOrderById(req.params.id, (err, order) => {
    if (err) res.send(err);
    console.log("Single Order data", order);
    res.send(order);
  });
};

exports.createNewOrder = (req, res) => {
  const orderReqData = new OrderModel(req.body);
  console.log("orderReqData", orderReqData);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Please fill all fields" });
  } else {
    OrderModel.createOrder(orderReqData, (err, order) => {
      if (err) {
        res.status(400);
        res.json({
          message: "Error while inserting data",
        });
      } else {
        res.json({
          message: "Order Created Successfully",
          data: order.insertId,
        });
      }
    });
  }
};

exports.updateOrder = (req, res) => {
  const orderReqData = new UpdatedOrderModel(req.body);
  console.log("orderReqData update", orderReqData);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .sendStatus(400)
      .send({ success: false, message: "Please fill all fields" });
  } else {
    UpdatedOrderModel.updateOrder(req.params.id, orderReqData, (err) => {
      if (err) {
        res.status(400);
        res.json({
          message: "Error while updating data",
        });
      } else {
        res.json({
          message: "Order updated Successfully",
        });
      }
    });
  }
};

exports.deleteOrder = (req, res) => {
  OrderModel.deleteOrder(req.params.id, (err) => {
    if (err) {
      res.status(400);
      res.json({
        message: "Error while deleting data",
      });
    } else {
      res.json({ message: "Order deleted successully!" });
    }
  });
};
