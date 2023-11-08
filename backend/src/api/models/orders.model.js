var dbconfig = require("../../../config/db.config");
var statusEnum = require("./models").statusEnum;

const Orders = function (order) {
  this.number_of_items = order.number_of_items;
  this.user_id = order.user_id;
  this.cost_center = order.cost_center;
  this.location = order.location;
  this.ext_supply_id = order.ext_supply_id;
  this.ext_order_id = order.ext_order_id;
  this.currency = order.currency;
  this.netsum = order.netsum;
  this.created_date = new Date();
  this.last_modified_date = new Date();
  this.status = statusEnum.WARTEN;
  this.description = order.description;
  this.local_config_id = order.local_config_id;
};

const UpdatedOrders = function (order) {
  this.cost_center = order.cost_center;
  this.ext_supply_id = order.ext_supply_id;
  this.ext_order_id = order.ext_order_id;
  this.created_date = this.created_date;
  this.last_modified_date = new Date();
  this.status = order.status;
  this.description = order.description;
};

Orders.getAllOrders = (result) => {
  dbconfig.query("SELECT * FROM orders", (err, res) => {
    if (err) {
      console.log("Error while fetching Orders", err);
      result(err, res);
    } else {
      console.log("Orders fetched successfully");
      result(null, res);
    }
  });
};

Orders.getOrderById = (id, result) => {
  dbconfig.query("SELECT * FROM orders WHERE orders_id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching Order by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Orders.createOrder = (req, result) => {
  dbconfig.query("INSERT INTO orders SET ?", req, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(err, res);
    } else {
      console.log("Order created successfully", {
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

UpdatedOrders.updateOrder = (id, req, result) => {
  dbconfig.query(
    "UPDATE orders SET cost_center=?," +
      "ext_supply_id=?,ext_order_id=?,description=?,status=? WHERE orders_id = ?",
    [
      req.cost_center,
      req.ext_supply_id,
      req.ext_order_id,
      req.description,
      req.status,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the order");
        result(err, res);
      } else {
        console.log("Order updated successfully");
        result(null, res);
      }
    }
  );
};

Orders.deleteOrder = (id, result) => {
  dbconfig.query("DELETE FROM orders WHERE orders_id=?", [id], (err, res) => {
    if (err) {
      console.log("Error while deleting the order");
      result(err, res);
    } else {
      result(null, res);
    }
  });
};

module.exports = { Orders, UpdatedOrders };
