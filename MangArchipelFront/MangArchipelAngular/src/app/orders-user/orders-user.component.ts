import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { ProductOrder } from '../product-order';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.css']
})
export class OrdersUserComponent implements OnInit {
  ProductOrderArray: ProductOrder[];
  orders: Order[];

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    console.log(id);
    this.orderService.getOrdersByUserId(id).subscribe(Orders => {
      this.orders = Orders;
      console.log(this.orders);
    });
  }

  ngOnInit() {
  }

  details(id: number ) {
    this.router.navigate(['/']);
  }

}
