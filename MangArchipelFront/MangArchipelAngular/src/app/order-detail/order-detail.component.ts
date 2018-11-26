import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  @Input() order: Order;

  constructor(private orderService: OrderService,
    private route: ActivatedRoute, ) {
    this.order = new Order();
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    this.orderService.getOrderById(id).subscribe(o => {
      this.order = o;
      console.log(this.order);
    });
  }

}
