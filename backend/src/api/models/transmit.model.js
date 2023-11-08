var Orders = require("../models/orders.model").Orders;
var OrderItem = require("../models/orderItems.model").OrderItems;
var LocalConfig = require("../models/localConfig.model");

var newUserId = 0;
var newLocalConfigId = 0;

exports.ociParser = (req, res) => {
  let ociRequest = { ...req };
  ociRequest = JSON.parse(
    JSON.stringify(ociRequest)
      .split('"NEW_ITEM-DESCRIPTION"')
      .join('"article_description"')
  );
  ociRequest = JSON.parse(
    JSON.stringify(ociRequest).split('"NEW_ITEM-QUANTITY"').join('"quantity"')
  );

  ociRequest = JSON.parse(
    JSON.stringify(ociRequest).split('"NEW_ITEM-UNIT"').join('"measure_unit"')
  );

  ociRequest = JSON.parse(
    JSON.stringify(ociRequest).split('"NEW_ITEM-PRICE"').join('"unit_price"')
  );

  ociRequest = JSON.parse(
    JSON.stringify(ociRequest)
      .split('"NEW_ITEM-VENDORMAT"')
      .join('"article_number"')
  );

  ociRequest = JSON.parse(
    JSON.stringify(ociRequest)
      .split('"NEW_ITEM-LONGTEXT_N_132_STRIP_HTML"')
      .join('"description"')
  );

  ociRequest = JSON.parse(
    JSON.stringify(ociRequest).split('"NEW_ITEM-CURRENCY"').join('"currency"')
  );

  ociRequest = JSON.parse(
    JSON.stringify(ociRequest)
      .split('"NEW_ITEM-LEADTIME"')
      .join('"delivery_date"')
  );

  let convertedJson = JSON.stringify(ociRequest)
    .toString()
    .replaceAll("'", '"');

  let newobj = JSON.parse(convertedJson);

  return newobj;
};

exports.requestToAbas = (order, orderItem, localConfig) => {
  var test = [];
  for (let i = 0; i < orderItem.length; i++) {
    var order_item_json = {
      LINE_ITEM_ID: orderItem[i].line_item_id,
      ARTICLE_ID: {
        SUPPLIER_AID: "",
        DESCRIPTION_SHORT: orderItem[i].article_description,
      },
      QUANTITY: orderItem[i].quantity,
      ORDER_UNIT: orderItem[i].measure_unit,
      ARTICLE_PRICE: {
        "@type": "net_list",
        PRICE_AMOUNT: orderItem[i].unit_price,
        PRICE_LINE_AMOUNT: orderItem[i].total_price,
        TAX: orderItem[i].tax,
        PRICE_QUANTITY: 1,
      },
    };
    test.push(order_item_json);
  }

  localConfig = JSON.parse(JSON.stringify(localConfig));
  console.log(localConfig);
  var newJson = {
    ORDER_HEADER: {
      CONTROL_INFO: {
        GENERATION_DATE: new Date(),
      },
    },
    ORDER_INFO: {
      ORDER_ID: order.id,
      ORDER_DATE: order.created_date.toISOString().split("T")[0],
      ORDER_PARTIES: {
        BUYER_PARTY: {
          PARTY: {
            PARTY_ID: newLocalConfigId,
          },
          ADDRESS: {
            NAME: localConfig[0].buyer_party_name,
            STREET: localConfig[0].address_1,
            ZIP: localConfig[0].zipcode_1,
            CITY: localConfig[0].city_1,
            COUNTRY: localConfig[0].country_1,
            PHONE: {
              "@type": "office",
              "#text": localConfig[0].tel_number_1,
            },
          },
        },
        SUPPLIER_PARTY: {
          PARTY: {
            PARTY_ID: newLocalConfigId,
          },
          ADDRESS: {
            NAME: localConfig[0].supplier_party_name,
            STREET: localConfig[0].address_2,
            ZIP: localConfig[0].zipcode_2,
            CITY: localConfig[0].city_2,
            COUNTRY: localConfig[0].country_2,
          },
        },
        INVOICE_PARTY: {
          PARTY: {
            ADDRESS: {
              NAME: localConfig[0].invoice_party_name,
              STREET: localConfig[0].address_3,
              ZIP: localConfig[0].zipcode_3,
              CITY: localConfig[0].city_3,
              COUNTRY: localConfig[0].country_3,
              PHONE: {
                "@type": "office",
                "#text": localConfig[0].tel_number_3,
              },
              EMAIL: localConfig[0].email_address_3,
            },
          },
        },
        PRICE_CURRENCY: order.currency,
      },
      ORDER_ITEM_LIST: {
        ORDER_ITEM: test,
      },
      ORDER_SUMMARY: {
        TOTAL_ITEM_NUM: order.number_of_items,
        TOTAL_AMOUNT: order.netsum,
      },
    },
  };
  const reqtoAbas = JSON.parse(JSON.stringify(newJson));

  return reqtoAbas;
};

exports.orderCreator = (req, res) => {
  let orderRequest = { ...req };

  const number_of_items = orderRequest.article_description.length;
  var netsum = 0;
  var currency = orderRequest.currency[0];
  var description = orderRequest.description[0];

  for (let i in orderRequest.article_description) {
    netsum += orderRequest.quantity[i] * orderRequest.unit_price[i];
  }

  netsum = netsum.toFixed(2);

  var newJson = {
    number_of_items: number_of_items,
    local_config_id: newLocalConfigId,
    user_id: newUserId,
    location: "Deutschland",
    cost_center: 3,
    currency: currency,
    netsum: netsum,
    description: description,
  };

  let newobj = Object.assign(orderRequest, newJson);
  var orderReqData = new Orders(newobj);

  return orderReqData;
};

exports.orderItemCreator = (order, orderItem) => {
  let orderRequest = { ...order };
  let orderItemRequest = { ...orderItem };

  var newRequest = Object.assign(orderRequest, orderItemRequest);
  var counter = 1;
  var deliverDate = new Date();

  for (let i in newRequest.article_description) {
    var newJson = {
      article_number: parseInt(newRequest.article_number[i]),
      quantity: parseInt(newRequest.quantity[i]),
      measure_unit: newRequest.measure_unit[i],
      article_description: newRequest.article_description[i],
      unit_price: parseFloat(newRequest.unit_price[i]),
      total_price: newRequest.quantity[i] * newRequest.unit_price[i],
      delivery_date: new Date(
        deliverDate.setDate(
          deliverDate.getDate() + parseInt(newRequest.delivery_date)
        )
      ),
      tax: 0.19,
      line_item_id: counter,
      orders_id: newRequest.id,
    };

    var orderItemReqData = new OrderItem(newJson);

    OrderItem.createOrderItem(orderItemReqData, (err, orderItem) => {});
    counter++;
  }
};

var receiveUserAndLocalConfigId = (req, result) => {
  newUserId = req.body.user_id;
  newLocalConfigId = req.body.local_config_id;
};

var convertTransmitData = (req, result) => {
  var convertedJSON = this.ociParser(req, result);

  const myOrder = this.orderCreator(convertedJSON);

  Orders.createOrder(myOrder, (err, order) => {
    this.orderItemCreator(order, convertedJSON);
    Orders.getOrderById(order.id, (err, newOrder) => {
      OrderItem.getOrderItemById(order.id, (err, orderItem) => {
        LocalConfig.getLocalConfigById(
          newLocalConfigId,
          (err, newlocalConfig) => {
            const output = this.requestToAbas(order, orderItem, newlocalConfig);
            result(null, output);
          }
        );
      });
    });
  });
};

module.exports = { convertTransmitData, receiveUserAndLocalConfigId };
