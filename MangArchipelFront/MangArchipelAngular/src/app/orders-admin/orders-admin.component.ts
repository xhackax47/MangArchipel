import { Component, OnInit } from '@angular/core';
import { ProductOrders } from '../product-orders';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { ProductOrder } from '../product-order';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {
  productOrders: ProductOrder[];
  orders: ProductOrders;
  total: number;
  sub: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.productOrders = [];
    this.orders = new ProductOrders();
    this.orders.productOrders = [];
    this.loadOrders();
    this.loadTotal();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((value ) => {
      console.log(value);
      this.orders.productOrders = value;
    });
  }

  loadTotal() {
    this.orderService.ordersChanged.subscribe(() => {
      this.total = this.orderService.Total;
    });
  }

}
