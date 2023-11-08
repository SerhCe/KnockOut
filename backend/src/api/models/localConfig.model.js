var dbconfig = require("../../../config/db.config");

const LocalConfigs = function (localConfig) {
  this.local_config_name = localConfig.local_config_name;
  this.buyer_party_name = localConfig.buyer_party_name;
  this.tel_number_1 = localConfig.tel_number_1;
  this.address_1 = localConfig.address_1;
  this.zipcode_1 = localConfig.zipcode_1;
  this.city_1 = localConfig.city_1;
  this.country_1 = localConfig.country_1;
  this.supplier_party_name = localConfig.supplier_party_name;
  this.address_2 = localConfig.address_2;
  this.zipcode_2 = localConfig.zipcode_2;
  this.city_2 = localConfig.city_2;
  this.country_2 = localConfig.country_2;
  this.invoice_party_name = localConfig.invoice_party_name;
  this.tel_number_3 = localConfig.tel_number_3;
  this.email_address_3 = localConfig.email_address_3;
  this.address_3 = localConfig.address_3;
  this.zipcode_3 = localConfig.zipcode_3;
  this.city_3 = localConfig.city_3;
  this.country_3 = localConfig.country_3;
};

LocalConfigs.getAllLocalConfigs = (result) => {
  dbconfig.query("SELECT * FROM local_config", (err, res) => {
    if (err) {
      console.log("Error while fetching Local Configs", err);
      result(err, res);
    } else {
      console.log("Local Configs fetched successfully");
      result(null, res);
    }
  });
};

LocalConfigs.getLocalConfigById = (id, result) => {
  dbconfig.query(
    "SELECT * FROM local_config WHERE local_config_id=?",
    id,
    (err, res) => {
      if (err) {
        console.log("Error while fetching Local Config by id", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

LocalConfigs.createLocalConfig = (req, result) => {
  dbconfig.query("INSERT INTO local_config SET ?", req, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(err, res);
    } else {
      console.log("Local Configs created successfully", {
        id: res.inserId,
        ...req,
      });
      result(null, {
        id: res.insertId,
        ...req,
      });
    }
  });
};

//@TODO
LocalConfigs.updateLocalConfig = (id, req, result) => {
  dbconfig.query(
    "UPDATE local_config SET local_config_name=?, buyer_party_name = ?,tel_number_1=?,address_1=?,zipcode_1=?, city_1=?, country_1=?, " +
      "supplier_party_name = ?,address_2=?,zipcode_2=?,city_2=?, country_2=?," +
      "invoice_party_name = ?,tel_number_3=?,email_address_3=?,address_3=?,zipcode_3=?,city_3=?, country_3=? WHERE local_config_id=?",
    [
      req.local_config_name,
      req.buyer_party_name,
      req.tel_number_1,
      req.address_1,
      req.zipcode_1,
      req.city_1,
      req.country_1,
      req.supplier_party_name,
      req.address_2,
      req.zipcode_2,
      req.city_2,
      req.country_2,
      req.invoice_party_name,
      req.tel_number_3,
      req.email_address_3,
      req.address_3,
      req.zipcode_3,
      req.city_3,
      req.country_3,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the Local Config");
        result(err, res);
      } else {
        console.log("Local Config updated successfully");
        result(null, res);
      }
    }
  );
};

LocalConfigs.deleteLocalConfig = (id, result) => {
  dbconfig.query(
    "DELETE FROM local_config WHERE local_config_id=?",
    [id],
    (err, res) => {
      if (err) {
        console.log("Error while deleting the Local Config");
        result(err, res);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = LocalConfigs;
