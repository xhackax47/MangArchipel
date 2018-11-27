
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: Order;
  constructor(private route: ActivatedRoute, private orderService: OrderService) {
    const id = parseInt( route.snapshot.paramMap.get('id'), 0);
    orderService.getOrderById(id).subscribe(order => {
      this.order = order;
    });
  }

  ngOnInit() {

  }

}
