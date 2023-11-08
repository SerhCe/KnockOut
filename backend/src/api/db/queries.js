exports.knockoutTables = (con) => {
  con.query("CREATE DATABASE IF NOT EXISTS knockout");

  con.query("USE knockout");

  con.query(
    "CREATE TABLE IF NOT EXISTS local_config ( " +
      "local_config_id INT AUTO_INCREMENT PRIMARY KEY, " +
      "local_config_name VARCHAR(1000) NOT NULL," +
      "buyer_party_name VARCHAR(1000) NOT NULL," +
      "tel_number_1 varchar(15) NOT NULL," +
      "address_1 VARCHAR(1000) NOT NULL, " +
      "zipcode_1 int NOT NULL," +
      "city_1 VARCHAR(1000) NOT NULL, " +
      "country_1 VARCHAR(1000) NOT NULL, " +
      "supplier_party_name VARCHAR(1000) NOT NULL," +
      "address_2 VARCHAR(1000) NOT NULL, " +
      "zipcode_2 int NOT NULL," +
      "city_2 VARCHAR(1000) NOT NULL, " +
      "country_2 VARCHAR(1000) NOT NULL, " +
      "invoice_party_name VARCHAR(1000) NOT NULL," +
      "tel_number_3 varchar(15) NOT NULL," +
      "email_address_3 VARCHAR(1000) NOT NULL, " +
      "address_3 VARCHAR(1000) NOT NULL, " +
      "zipcode_3 int NOT NULL," +
      "city_3 VARCHAR(1000) NOT NULL, " +
      "country_3 VARCHAR(1000) NOT NULL " +
      ")"
  );

  con.query(
    "CREATE TABLE IF NOT EXISTS orders ( " +
      "orders_id INT AUTO_INCREMENT PRIMARY KEY, " +
      "local_config_id INT NOT NULL," +
      "number_of_items INT NOT NULL, " +
      "user_id INT NOT NULL, " +
      "cost_center DOUBLE NOT NULL, " +
      "location VARCHAR(255) NOT NULL, " +
      "ext_supply_id INT , " +
      "ext_order_id INT , " +
      "currency VARCHAR(255) NOT NULL, " +
      "netsum DOUBLE NOT NULL, " +
      "created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
      "last_modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
      "status ENUM('Bestellt', 'Fehler', 'Warten auf Genehmigung', 'Genehmigt', 'Abgelehnt') NOT NULL," +
      "description VARCHAR(1000), " +
      "FOREIGN KEY (local_config_id) REFERENCES local_config(local_config_id), " +
      "ref1 VARCHAR(100), " +
      "ref2 VARCHAR(100), " +
      "ref3 VARCHAR(100), " +
      "ref4 VARCHAR(1000), " +
      "ref5 VARCHAR(1000), " +
      "ref6 VARCHAR(1000)" +
      ")"
  );

  con.query(
    "CREATE TABLE IF NOT EXISTS order_item ( " +
      "order_item_id INT AUTO_INCREMENT PRIMARY KEY, " +
      "orders_id INT NOT NULL, " +
      "FOREIGN KEY (orders_id) REFERENCES orders(orders_id), " +
      "article_number INT NOT NULL, " +
      "quantity DOUBLE NOT NULL, " +
      "measure_unit VARCHAR(255) NOT NULL, " +
      "ext_article_number INT, " +
      "article_description VARCHAR(1000) NOT NULL, " +
      "unit_price DOUBLE NOT NULL, " +
      "total_price DOUBLE NOT NULL, " +
      "delivery_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
      "created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
      "last_modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
      "tax DOUBLE NOT NULL, " +
      "line_item_id INT NOT NULL, " +
      "ref1 VARCHAR(100), " +
      "ref2 VARCHAR(100), " +
      "ref3 VARCHAR(100), " +
      "ref4 VARCHAR(1000), " +
      "ref5 VARCHAR(1000), " +
      "ref6 VARCHAR(1000)" +
      ")"
  );

  con.query(
    "CREATE TABLE IF NOT EXISTS configuration ( " +
      "configuration_id INT AUTO_INCREMENT PRIMARY KEY, " +
      "supplier_name VARCHAR(3000) NOT NULL, " +
      "shop_url VARCHAR(3000) NOT NULL, " +
      "shop_user VARCHAR(255) NOT NULL, " +
      "shop_password VARCHAR(255) NOT NULL," +
      "shop_return_address VARCHAR(255) NOT NULL, " +
      "supply_id INT NOT NULL, " +
      "created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
      "last_modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
      "status ENUM('active', 'inactive') NOT NULL, " +
      "ref1 VARCHAR(100), " +
      "ref2 VARCHAR(100), " +
      "ref3 VARCHAR(100), " +
      "ref4 VARCHAR(1000), " +
      "ref5 VARCHAR(1000), " +
      "ref6 VARCHAR(1000)" +
      ")"
  );
};
