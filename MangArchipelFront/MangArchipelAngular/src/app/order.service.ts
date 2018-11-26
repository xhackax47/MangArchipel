import { Injectable } from '@angular/core';
import { ProductOrder } from './product-order';
import { ProductOrders } from './product-orders';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = 'http://localhost:8098/api/orders';
  httpOptions = {
    headers: new HttpHeaders().set('Content-type', 'application/json')
  };

  private productOrder: ProductOrder;
  private orders: ProductOrders = new ProductOrders();

  private productOrderSubject = new Subject();
  private ordersSubject = new Subject();
  private totalSubject = new Subject();

  private total: number;

  productOrderChanged = this.productOrderSubject.asObservable();
  ordersChanged = this.ordersSubject.asObservable();
  totalChanged = this.totalSubject.asObservable();

  constructor(private http: HttpClient) { }

  saveOrder(order: ProductOrders) {
    return this.http.post(this.url + '/', order, this.httpOptions);
  }

  get SelectedProductOrder() {
    return this.productOrder;
  }

  set SelectedProductOrder(value: ProductOrder) {
    this.productOrder = value;
    this.productOrderSubject.next(value);
  }

  get ProductOrders() {
    return this.orders;
  }

  set ProductOrders(value: ProductOrders) {
    this.orders = value;
    this.ordersSubject.next(value);
  }

  get Total() {
    return this.total;
  }

  set Total(value: number) {
    this.total = value;
    this.totalSubject.next(value);
  }

  addOrder(order: Order) {
    this.orders.productOrders = [];
    this.orders.productOrders.push(order);
    this.ordersSubject.next(this.orders);
  }
}
