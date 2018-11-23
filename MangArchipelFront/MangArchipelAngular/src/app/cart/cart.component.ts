import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orders: Order[];
  constructor() {
    const o1: Order = new Order(new Product('toto'), 5);
    this.orders = [o1];
    console.log(this.orders);
  }

  ngOnInit() {
  }

}
