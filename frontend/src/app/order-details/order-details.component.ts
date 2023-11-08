import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Order_item } from '../../shared/models/models';
import { OrderItemService } from '../../shared/services/order_item.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @ViewChild('matEdit')
  matEdit!: MatSelect;

  @ViewChild('matDelete')
  matDelete!: MatSelect;

  orderItemForm = new FormGroup({
    order_item_id: new FormControl('', [
      Validators.required,
      Validators.pattern('/^-?(0|[1-9]d*)?$'),
    ]),
    orders_id: new FormControl('', [
      Validators.required,
      Validators.pattern('/^-?(0|[1-9]d*)?$'),
    ]),
    article_number: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
    ]),
    quantity: new FormControl('', [
      Validators.required,
      Validators.pattern('/^-?(0|[1-9]d*)?$'),
    ]),
    measure_unit: new FormControl('', Validators.required),
    ext_article_number: new FormControl('', [
      Validators.required,
      Validators.pattern('/^-?(0|[1-9]d*)?$'),
    ]),
    article_description: new FormControl('', Validators.required),
    unit_price: new FormControl('', [
      Validators.required,
      Validators.pattern('/^-?(0|[1-9]d*)?$'),
    ]),
    total_price: new FormControl('', [
      Validators.required,
      Validators.pattern('/^-?(0|[1-9]d*)?$'),
    ]),
    delivery_date: new FormControl('', Validators.required),
    created_date: new FormControl(''),
    last_modified_date: new FormControl(''),
    tax: new FormControl('', [
      Validators.required,
      Validators.pattern('/^-?(0|[1-9]d*)?$'),
    ]),
    line_item_id: new FormControl('', [
      Validators.required,
      Validators.pattern('/^-?(0|[1-9]d*)?$'),
    ]),
  });

  orderItem: Order_item[] = [];
  ordersIdUrl!: number;

  constructor(
    public orderItemService: OrderItemService,
    public router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getOrderItemData();
    this.ordersIdUrl = Number(this.router.url.split('/').pop());
  }

  getOrderItemData(): void {
    this.orderItemService
      .getOrderItem()
      .subscribe((orderItems) => (this.orderItem = orderItems));
  }

  getOrderItemDataById(id: number): void {
    this.orderItemService
      .getOrderItemById(id)
      .subscribe((orderItems) => (this.orderItem[id] = orderItems));
  }

  addOrderItemData(newOrderitem: Order_item) {
    this.orderItemService
      .addOrderItem(newOrderitem)
      .subscribe((orderItems) => this.orderItem.push(orderItems));
  }

  deleteOrderItem(orderItems: Order_item) {
    this.orderItem = this.orderItem.filter((c) => c !== orderItems);
    this.orderItemService.deleteOrderItem(orderItems.order_item_id).subscribe();
  }

  updateOrderItem(updatedOrderItems: Order_item) {
    this.orderItemService
      .updateOrderItem(updatedOrderItems.order_item_id, updatedOrderItems)
      .subscribe();
  }

  onSubmit() {
    console.log(this.orderItemForm.value);
    this.addOrderItemData(this.orderItemForm.value);
    this.getOrderItemData();
  }

  onEdit() {
    console.log(this.orderItemForm.value);
    this.updateOrderItem(this.orderItemForm.value);
  }

  onDelete() {
    console.log(this.orderItemForm.value);
    this.deleteOrderItem(this.orderItemForm.value);
    this.getOrderItemData();
    this.resetForm();
  }

  dropdownValues(test: any) {
    this.orderItemForm.setValue({
      order_item_id: test.order_item_id,
      orders_id: test.orders_id,
      article_number: test.article_number,
      quantity: test.quantity,
      measure_unit: test.measure_unit,
      ext_article_number: test.ext_article_number,
      article_description: test.article_description,
      unit_price: test.unit_price,
      total_price: test.total_price,
      delivery_date: test.delivery_date,
      created_date: test.created_date,
      last_modified_date: test.last_modified_date,
      tax: test.tax,
      line_item_id: test.line_item_id,
    });
    console.log(this.orderItemForm);
  }

  resetForm() {
    this.orderItemForm.reset();
    this.matEdit.options.forEach((data: MatOption) => data.deselect());
    this.matDelete.options.forEach((data: MatOption) => data.deselect());
  }
}
