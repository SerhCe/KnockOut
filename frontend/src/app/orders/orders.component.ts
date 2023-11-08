import { Sort } from '@angular/material/sort';
import { Component, OnInit } from '@angular/core';
import { Orders, Order_item } from '../../shared/models/models';
import { OrdersService } from '../../shared/services/orders.service';
import { OrderItemService } from 'src/shared/services/order_item.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  sortedData: Orders[] = [];
  orderDetails: Order_item[] = [];

  ngOnInit(): void {
    this.getOrdersData();
    this.getOrderDetailsData();
  }

  constructor(
    public ordersService: OrdersService,
    public orderItemService: OrderItemService
  ) {
    this.sortedData = this.sortedData.slice();
    this.orderDetails = this.orderDetails.slice();
  }

  getOrdersData(): void {
    this.ordersService
      .getOrders()
      .subscribe((orders) => (this.sortedData = orders));
  }

  getOrderDetailsData(): void {
    this.orderItemService
      .getOrderItem()
      .subscribe((orderItems) => (this.orderDetails = orderItems));
  }

  removeDuplicatesOfArray() {
    this.orderDetails = this.orderDetails.filter(
      (v, i, a) => a.findIndex((v2) => v2.orders_id === v.orders_id) === i
    );
  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'orders_id':
          return compare(a.orders_id, b.orders_id, isAsc);
        case 'number_of_items':
          return compare(a.number_of_items, b.number_of_items, isAsc);
        case 'user_id':
          return compare(a.user_id, b.user_id, isAsc);
        case 'cost_center':
          return compare(a.cost_center, b.cost_center, isAsc);
        case 'location':
          return compare(a.location, b.location, isAsc);
        case 'currency':
          return compare(a.currency, b.currency, isAsc);
        case 'netsum':
          return compare(a.netsum, b.netsum, isAsc);
        case 'created_date':
          return compare(a.created_date, b.created_date, isAsc);
        case 'last_modified_date':
          return compare(a.last_modified_date, b.last_modified_date, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(
  a: number | string | Date,
  b: number | string | Date,
  isAsc: boolean
) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
