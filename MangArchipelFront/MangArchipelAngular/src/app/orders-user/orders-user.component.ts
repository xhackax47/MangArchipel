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
  Orders: Order[];

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    this.orderService.getOrdersByUserId(id).subscribe(Orders => {
      this.Orders = Orders;
    });
  }

  ngOnInit() {
  }

  details(id:number){
    this.router.navigate(['/']);
  }

}
