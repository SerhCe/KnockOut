var LocalConfigModel = require("../models/localConfig.model");

exports.getAllLocalConfigs = (req, res) => {
  LocalConfigModel.getAllLocalConfigs((err, localConfig) => {
    if (err) {
      res.status(400);
      res.json({
        message: "Error while accessing data",
      });
    } else {
      console.log("Local Config", localConfig);
      res.send(localConfig);
    }
  });
};

exports.getLocalConfigById = (req, res) => {
  LocalConfigModel.getLocalConfigById(req.params.id, (err, localConfig) => {
    if (err) res.send(err);
    console.log("Single Local Config data", localConfig);
    res.send(localConfig);
  });
};

exports.createLocalConfig = (req, res) => {
  const localConfigReqData = new LocalConfigModel(req.body);
  console.log("localConfigReqData", localConfigReqData);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ message: "Please fill all fields" });
  } else {
    LocalConfigModel.createLocalConfig(
      localConfigReqData,
      (err, localConfig) => {
        if (err) {
          res.status(400);
          res.json({
            message: "Error while inserting data",
          });
        } else {
          res.json({
            message: "Local Config Created Successfully",
            data: localConfig.insertId,
          });
        }
      }
    );
  }
};

exports.updateLocalConfig = (req, res) => {
  const localConfigReqData = new LocalConfigModel(req.body);
  console.log("localConfigReqData update", localConfigReqData);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .sendStatus(400)
      .send({ success: false, message: "Please fill all fields" });
  } else {
    LocalConfigModel.updateLocalConfig(
      req.params.id,
      localConfigReqData,
      (err) => {
        if (err) {
          res.status(400);
          res.json({
            message: "Error while updating data",
          });
        } else {
          res.json({
            message: "Local Config updated Successfully",
          });
        }
      }
    );
  }
};

exports.deleteLocalConfig = (req, res) => {
  LocalConfigModel.deleteLocalConfig(req.params.id, (err) => {
    if (err) {
      res.status(400);
      res.json({
        message: "Error while deleting data",
      });
    } else {
      res.json({ message: "Local Config deleted successully!" });
    }
  });
};
