const express = require("express");
const app = express();
const port = 3000;

const ordersRoute = require("./api/routes/orders.route");
const orderItemsRoute = require("./api/routes/orderItems.route");
const configurationsRoute = require("./api/routes/configuration.route");
const localConfigRoute = require("./api/routes/localConfig.route");
const transmitRoute = require("./api/routes/transmit.route");
const receiveIdRoute = require("./api/routes/receiveId.route");
const transmitToShopRoute = require("./api/routes/transmitToShop.route");

const bodyParser = require("body-parser");
app.use(bodyParser.text({ type: "text/html" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  next();
});

app.use("/api/v1/orders", ordersRoute);
app.use("/api/v1/order_item", orderItemsRoute);
app.use("/api/v1/configuration", configurationsRoute);
app.use("/api/v1/local_config", localConfigRoute);
app.use("/api/v1/receiveId", receiveIdRoute);
app.use("/api/v1/transmit", transmitRoute);
app.use("/api/v1/transmitToShop", transmitToShopRoute);
app.set("json spaces", 4);

app.listen(port, () => {
  console.log(`Knock-Back is running at port ${port}`);
});
