export enum URISTRING {
  URI = 'http://localhost:3000/api/v1/',
  ORDERS = 'orders/',
  ORDERITEM = 'order_item/',
  CONFIGURATION = 'configuration/',
  LOCALCONFIG = 'local_config/',
  TRANSMIT = 'transmit/',
  RECEIVEID = 'receiveId/',
  TRANSMITTOWEBSHOP = 'transmitToShop/',
}

export enum ordersEnum {
  BESTELLT = 'Bestellt',
  FEHLER = 'Fehler',
  WARTEN = 'Warten auf Genehmigung',
  GENEHMIGT = 'Genehmigt',
  ABGELEHNT = 'Abgelehnt',
}

export class Orders {
  public orders_id: number;
  public number_of_items: number;
  public user_id: number;
  public cost_center: number;
  public location: string;
  public ext_supply_id: number;
  public ext_order_id: number;
  public currency: number;
  public netsum: number;
  public created_date: Date;
  public last_modified_date: Date;
  public status: ordersEnum;
  public description: string;
  public local_config_id: number;

  constructor(orders: Orders) {
    this.orders_id = orders.orders_id;
    this.number_of_items = orders.number_of_items;
    this.user_id = Number(sessionStorage.getItem('session_user_id'));
    this.cost_center = orders.cost_center;
    this.location = orders.location;
    this.ext_supply_id = orders.ext_supply_id;
    this.ext_order_id = orders.ext_order_id;
    this.currency = orders.currency;
    this.netsum = orders.netsum;
    this.created_date = orders.created_date;
    this.last_modified_date = orders.last_modified_date;
    this.status = orders.status;
    this.description = orders.description;
    this.local_config_id = orders.local_config_id;
  }
}

export class Order_item {
  public order_item_id: number;
  public orders_id: number;
  public article_number: number;
  public quantity: number;
  public measure_unit: string;
  public ext_article_number: number;
  public article_description: string;
  public unit_price: number;
  public total_price: number;
  public delivery_date: Date;
  public created_date: Date;
  public last_modified_date: Date;
  public tax: number;
  public line_item_id: number;

  constructor(order_item: Order_item) {
    this.order_item_id = order_item.order_item_id;
    this.orders_id = order_item.orders_id;
    this.article_number = order_item.article_number;
    this.quantity = order_item.quantity;
    this.measure_unit = order_item.measure_unit;
    this.ext_article_number = order_item.ext_article_number;
    this.article_description = order_item.article_description;
    this.unit_price = order_item.unit_price;
    this.total_price = order_item.total_price;
    this.delivery_date = order_item.delivery_date;
    this.created_date = order_item.created_date;
    this.last_modified_date = order_item.last_modified_date;
    this.tax = order_item.tax;
    this.line_item_id = order_item.line_item_id;
  }
}

export class Configuration {
  public configuration_id: number;
  public shop_url: string;
  public shop_user: string;
  public shop_password: string;
  public shop_return_address: string;
  public supply_id: number;
  public supplier_name: string;
  public created_date: Date;
  public last_modified_date: Date;
  public status: string;

  constructor(configuration: Configuration) {
    this.configuration_id = configuration.configuration_id;
    this.shop_url = configuration.shop_url;
    this.shop_user = configuration.shop_user;
    this.shop_password = configuration.shop_password;
    this.shop_return_address = configuration.shop_return_address;
    this.supply_id = configuration.supply_id;
    this.supplier_name = configuration.supplier_name;
    this.created_date = configuration.created_date;
    this.last_modified_date = new Date();
    this.status = configuration.status;
  }
}

export class Transmit {
  public user_id: number;
  public local_config_id: number;

  constructor(transmit: Transmit) {
    this.user_id = transmit.user_id;
    this.local_config_id = transmit.local_config_id;
  }
}

export class Local_config {
  public local_config_id: number;
  public local_config_name: string;
  public buyer_party_name: string;
  public tel_number_1: string;
  public address_1: string;
  public zipcode_1: number;
  public city_1: string;
  public country_1: string;
  public supplier_party_name: string;
  public address_2: string;
  public zipcode_2: number;
  public city_2: string;
  public country_2: string;
  public invoice_party_name: string;
  public tel_number_3: string;
  public email_address_3: string;
  public address_3: string;
  public zipcode_3: number;
  public city_3: string;
  public country_3: string;

  constructor(local_config: Local_config) {
    this.local_config_id = local_config.local_config_id;
    this.local_config_name = local_config.local_config_name;
    this.buyer_party_name = local_config.buyer_party_name;
    this.tel_number_1 = local_config.tel_number_1;
    this.address_1 = local_config.address_1;
    this.zipcode_1 = local_config.zipcode_1;
    this.city_1 = local_config.city_1;
    this.country_1 = local_config.country_1;
    this.supplier_party_name = local_config.supplier_party_name;
    this.address_2 = local_config.address_2;
    this.zipcode_2 = local_config.zipcode_2;
    this.city_2 = local_config.city_2;
    this.country_2 = local_config.country_2;
    this.invoice_party_name = local_config.invoice_party_name;
    this.tel_number_3 = local_config.tel_number_3;
    this.email_address_3 = local_config.email_address_3;
    this.address_3 = local_config.address_3;
    this.zipcode_3 = local_config.zipcode_3;
    this.city_3 = local_config.city_3;
    this.country_3 = local_config.country_3;
  }
}
