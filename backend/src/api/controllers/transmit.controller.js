var Transmit = require("../models/transmit.model");

exports.postTransmit = (req, res) => {
  const shoppingCart = JSON.stringify(req.body);
  const orderReqData = JSON.parse(shoppingCart);
  Transmit.convertTransmitData(orderReqData, (err, transmit) => {
    if (err) {
      res.status(400);
      res.json({
        message: "Error while transmitting data",
      });
    } else {
      res.send({
        message: "Order transmitted successfully",
        data: transmit,
      });
    }
  });
};
