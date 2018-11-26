import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { ProductOrder } from '../product-order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.css']
})
export class OrdersUserComponent implements OnInit {
  orders: ProductOrder[];

  constructor( private orderService: OrderService,private route: ActivatedRoute) {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    this.orderService.getOrdersByUserId(id).subscribe(orders => {
      this.orders = orders;
    });
   }

  ngOnInit() {
  }

}
