var ConfigurationModel =
  require("../models/configuration.model").Configurations;
var UpdatedConfigurationModel =
  require("../models/configuration.model").UpdatedConfigurations;

exports.getAllConfigurations = (req, res) => {
  ConfigurationModel.getAllConfigurations((err, configuration) => {
    if (err) res.send(err);
    console.log("Configurations", configuration);
    res.send(configuration);
  });
};

exports.getConfigurationById = (req, res) => {
  ConfigurationModel.getConfigurationById(
    req.params.id,
    (err, configuration) => {
      if (err) res.send(err);
      console.log("Single Configuration data", configuration);
      res.send(configuration);
    }
  );
};

exports.createConfiguration = (req, res) => {
  const configurationReqData = new ConfigurationModel(req.body);
  console.log("configurationReqData", configurationReqData);
  if ((req.body.constructor === Object && Object.keys(req.body).length) === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    ConfigurationModel.createConfiguration(
      configurationReqData,
      (err, configuration) => {
        if (err) {
          res.status(400);
          res.json({
            message: "Error while inserting data",
          });
        } else {
          res.json({
            message: "Configuration Created Successfully",
            data: configuration.insertId,
          });
        }
      }
    );
  }
};

exports.updateConfiguration = (req, res) => {
  const configurationReqData = new UpdatedConfigurationModel(req.body);
  console.log("configurationReqData update", configurationReqData);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .sendStatus(400)
      .send({ success: false, message: "Please fill all fields" });
  } else {
    UpdatedConfigurationModel.updateConfiguration(
      req.params.id,
      configurationReqData,
      (err) => {
        if (err) {
          res.status(400);
          res.json({
            message: "Error while updating data",
          });
        } else {
          res.json({
            message: "Configuration updated Successfully",
          });
        }
      }
    );
  }
};

exports.deleteConfiguration = (req, res) => {
  ConfigurationModel.deleteConfiguration(req.params.id, (err) => {
    if (err) {
      res.status(400);
      res.json({
        message: "Error while deleting data",
      });
    } else {
      res.json({ message: "Configuration deleted successully!" });
    }
  });
};
