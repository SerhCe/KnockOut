var Transmit = require("../models/transmit.model");

exports.userIdAndLocalConfigId = (req, res) => {
  Transmit.receiveUserAndLocalConfigId(req, (err, transmit) => {
    if (err) {
      res.status(400);
      res.json({
        message: "Error while receiving data",
      });
    } else {
      res.send({
        message: "Data received successfully",
        data: transmit,
      });
    }
  });
};
