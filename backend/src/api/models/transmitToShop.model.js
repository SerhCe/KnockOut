const LocalConfig = require("./localConfig.model");
const OrderItems = require("./orderItems.model").OrderItems;
const Order = require("./orders.model").UpdatedOrders;

exports.transferToWebshop = (order, orderItem, localConfig) => {
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
  order.created_date = new Date(order.created_date);

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
            PARTY_ID: order.local_config_id,
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
            PARTY_ID: order.local_config_id,
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

  const reqtoWebshop = JSON.parse(JSON.stringify(newJson));

  return reqtoWebshop;
};

var convertTransmitData = (req, result) => {
  const order = JSON.parse(JSON.stringify(req.body));
  Order.updateOrder(order.orders_id, order, (err, updateOrder) => {
    OrderItems.getOrderItemById(order.orders_id, (err, orderItem) => {
      LocalConfig.getLocalConfigById(
        order.local_config_id,
        (err, newlocalConfig) => {
          var output = this.transferToWebshop(order, orderItem, newlocalConfig);
          console.log(output);
          result(null, output);
        }
      );
    });
  });
};

module.exports = { convertTransmitData };
