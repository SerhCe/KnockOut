var dbconfig = require("../../../config/db.config");
const statusEnum = require("./models");

const OrderItems = function (orderitem) {
  this.article_number = orderitem.article_number;
  this.quantity = orderitem.quantity;
  this.measure_unit = orderitem.measure_unit;
  this.ext_article_number = orderitem.ext_article_number;
  this.article_description = orderitem.article_description;
  this.unit_price = orderitem.unit_price;
  this.total_price = orderitem.total_price;
  this.delivery_date = orderitem.delivery_date;
  this.created_date = new Date();
  this.last_modified_date = new Date();
  this.tax = orderitem.tax;
  this.line_item_id = orderitem.line_item_id;
  this.orders_id = orderitem.orders_id;
};

const UpdatedOrderItems = function (orderitem) {
  this.article_number = orderitem.article_number;
  this.quantity = orderitem.quantity;
  this.measure_unit = orderitem.measure_unit;
  this.ext_article_number = orderitem.ext_article_number;
  this.article_description = orderitem.article_description;
  this.unit_price = orderitem.unit_price;
  this.total_price = orderitem.total_price;
  this.delivery_date = Date();
  this.created_date = orderitem.created_date;
  this.last_modified_date = new Date();
  this.status = orderitem.status;
  this.tax = orderitem.tax;
  this.line_item_id = orderitem.line_item_id;
};

OrderItems.getAllOrderItems = (result) => {
  //Why not OrderItems from one Order
  dbconfig.query("SELECT * FROM order_item", (err, res) => {
    if (err) {
      console.log("Error while fetching Order Items", err);
      result(err, res);
    } else {
      console.log("Order Items fetched successfully");
      result(null, res);
    }
  });
};

OrderItems.getOrderItemById = (id, result) => {
  dbconfig.query(
    "SELECT * FROM order_item WHERE orders_id=?",
    id,
    (err, res) => {
      if (err) {
        console.log("Error while fetching Order Item by id", err);
        result(null, err);
      } else {
        console.log("Order Item fetched successfully");
        result(null, res);
      }
    }
  );
};

OrderItems.createOrderItem = (req, result) => {
  dbconfig.query("INSERT INTO order_item SET ?", req, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(err, res);
    } else {
      console.log("Order Item created successfully", {
        id: res.insertId,
        ...req,
      });
      result(null, {
        id: res.insertId,
        ...req,
      });
    }
  });
};

UpdatedOrderItems.updateOrderItem = (id, req, result) => {
  dbconfig.query(
    "UPDATE order_item SET article_number=?,quantity=?,measure_unit=?,ext_article_number=?," +
      "article_description=?,unit_price=?,total_price=?,delivery_date=?,tax=?, WHERE order_item_id = ?",
    [
      req.article_number,
      req.quantity,
      req.measure_unit,
      req.ext_article_number,
      req.article_description,
      req.unit_price,
      req.total_price,
      req.delivery_date,
      req.tax,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the Order Item");
        result(err, res);
      } else {
        console.log("Order Item updated successfully");
        result(null, res);
      }
    }
  );
};

OrderItems.deleteOrderItem = (id, result) => {
  dbconfig.query(
    "DELETE FROM order_item WHERE order_item_id=?",
    [id],
    (err, res) => {
      if (err) {
        console.log("Error while deleting the Order Item");
        result(err, res);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = { OrderItems, UpdatedOrderItems };
