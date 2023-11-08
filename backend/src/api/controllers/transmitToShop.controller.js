var TransmitToShop = require("../models/transmitToShop.model");

exports.postToWebshop = (req, res) => {
  TransmitToShop.convertTransmitData(req, (err, transmit) => {
    if (err) {
      res.status(400);
      res.json({
        message: "Error while transferring data",
      });
    } else {
      res.send({
        message: "Data transfer successfully",
        data: transmit,
      });
    }
  });
};
