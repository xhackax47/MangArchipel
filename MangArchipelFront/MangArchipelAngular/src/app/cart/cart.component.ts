import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ProductOrders } from '../product-orders';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { ProductService } from '../product.service';
import { ProductOrder } from '../product-order';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  orderFinished: boolean;
  orders: ProductOrders;
  ordersBruno: ProductOrder[];
  cartOrders: ProductOrders;
  total: number;
  sub: Subscription;

  @Output() orderFinishedEvent: EventEmitter<boolean>;


  constructor(private orderService: OrderService, private productService: ProductService) {
    this.total = 0;
    this.orderFinished = false;
    this.orderFinishedEvent = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.orders = new ProductOrders();
    this.orders.productOrders = [];
    this.loadCart();
    this.orders = this.orderService.ProductOrders;
    this.loadTotal();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private calculateTotal(products: ProductOrder[] = []): number {
    let sum = 0;
    products.forEach(value => {
      sum += (value.product.price * value.quantity);
    });
    return sum;
  }

  loadTotal() {
    this.sub = this.orderService.ordersChanged.subscribe(() => {
      this.total = this.calculateTotal(this.orders.productOrders);
    });
  }

  loadCart() {
    this.sub = this.orderService.productOrderChanged.subscribe(() => {
      const productOrder = this.orderService.SelectedProductOrder;
      if (productOrder) {
        this.orders.productOrders.push(new ProductOrder(
          productOrder.product, productOrder.quantity = 1));
      }
      this.orders = this.orderService.ProductOrders;
      this.total = this.calculateTotal(this.orders.productOrders);
      this.orders = JSON.parse(localStorage.getItem('commande'));

    });
    // this.orders = this.orderService.ProductOrders;
  }

  loadOrders() {
    this.sub = this.orderService.ordersChanged.subscribe (() => {
      this.cartOrders = this.orderService.ProductOrders;
    });
    this.orders = this.orderService.ProductOrders;
  }

  finishOrder() {
    this.orderFinished = true;
    this.orderService.Total = this.total;
    this.orderFinishedEvent.emit(this.orderFinished);
  }

  reset() {
    this.orderFinished = false;
    this.orders = new ProductOrders();
    this.orders.productOrders = [];
    this.loadTotal();
    this.total = 0;
  }

}
