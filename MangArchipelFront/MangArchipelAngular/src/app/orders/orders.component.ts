import { Component, OnInit } from '@angular/core';
import { ProductOrders } from '../product-orders';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { Cart } from '../cart';
import { Order } from '../order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
  orders: ProductOrders;
  total: number;
  paid: boolean;
  sub: Subscription;

  listOrders: Array<Order>;
  cols: any[];

  constructor(private orderService: OrderService) {
      this.orders = new ProductOrders(JSON.parse(localStorage.getItem('commande')));
      this.total = orderService.calculateTotal();
  }

  ngOnInit() {
     /* this.paid = false;
      this.sub = this.orderService.ordersChanged.subscribe(() => {
          this.orders = this.orderService.ProductOrders;
      });*/
      // this.loadTotal();
  }

  pay() {
    this.paid = true;
    this.orderService.saveOrder(this.orders).subscribe();
  }

  loadTotal() {
    this.sub = this.orderService.ordersChanged.subscribe(() => {
      this.total = this.orderService.Total;
    });
  }
}
