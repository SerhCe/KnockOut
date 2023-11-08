var dbconfig = require("../../../config/db.config");

const Configurations = function (configuration) {
  this.supplier_name = configuration.supplier_name;
  this.shop_url = configuration.shop_url;
  this.shop_user = configuration.shop_user;
  this.shop_password = configuration.shop_password;
  this.shop_return_address = configuration.shop_return_address;
  this.supply_id = configuration.supply_id;
  this.created_date = new Date();
  this.last_modified_date = new Date();
  this.status = configuration.status;
};

const UpdatedConfigurations = function (configuration) {
  this.supplier_name = configuration.supplier_name;
  this.shop_url = configuration.shop_url;
  this.shop_user = configuration.shop_user;
  this.shop_password = configuration.shop_password;
  this.shop_return_address = configuration.shop_return_address;
  this.supply_id = configuration.supply_id;
  this.created_date = this.created_date;
  this.last_modified_date = new Date();
  this.status = configuration.status;
};

Configurations.getAllConfigurations = (result) => {
  dbconfig.query("SELECT * FROM configuration", (err, res) => {
    if (err) {
      console.log("Error while fetching Configurations", err);
      result(err, res);
    } else {
      console.log("Configurations fetched successfully");
      result(null, res);
    }
  });
};

Configurations.getConfigurationById = (id, result) => {
  dbconfig.query(
    "SELECT * FROM configuration WHERE configuration_id=?",
    id,
    (err, res) => {
      if (err) {
        console.log("Error while fetching Configuration by id", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Configurations.createConfiguration = (configurationReqData, result) => {
  dbconfig.query(
    "INSERT INTO configuration SET ?",
    configurationReqData,
    (err, res) => {
      if (err) {
        console.log("Error while inserting data");
        return result(err, res);
      } else {
        console.log("Configuration created successfully");
        return result(null, res);
      }
    }
  );
};

UpdatedConfigurations.updateConfiguration = (id, req, result) => {
  dbconfig.query(
    "UPDATE configuration SET supplier_name=?,shop_url=?,shop_user=?,shop_password=?,shop_return_address=?,supply_id=?,status=?,last_modified_date=? WHERE configuration_id = ?",
    [
      req.supplier_name,
      req.shop_url,
      req.shop_user,
      req.shop_password,
      req.shop_return_address,
      req.supply_id,
      req.status,
      req.last_modified_date,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the Configuration");
        result(err, res);
      } else {
        console.log("Configuration updated successfully");
        result(null, res);
      }
    }
  );
};

Configurations.deleteConfiguration = (id, result) => {
  dbconfig.query(
    "DELETE FROM configuration WHERE configuration_id=?",
    [id],
    (err, res) => {
      if (err) {
        console.log("Error while deleting the Configuration");
        result(err, res);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = { Configurations, UpdatedConfigurations };
