import { Injectable } from '@angular/core';
import { ProductOrder } from './product-order';
import { ProductOrders } from './product-orders';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Order } from './order';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = 'http://localhost:8098/api/orders';
  httpOptions = {
    headers: new HttpHeaders().set('Content-type', 'application/json')
  };

  private productOrder: ProductOrder;
  public orders: ProductOrders = new ProductOrders();

  private productOrderSubject = new Subject();
  private ordersSubject = new Subject();
  private totalSubject = new Subject();

  private total: number;

  productOrderChanged = this.productOrderSubject.asObservable();
  ordersChanged = this.ordersSubject.asObservable();
  totalChanged = this.totalSubject.asObservable();

  constructor(private http: HttpClient) {}

  saveOrder(order: ProductOrders) {
    return this.http.post(this.url + '/', order, this.httpOptions);
  }

  get ProductOrders() {
    return this.orders;
  }

  set ProductOrders(value: ProductOrders) {
    this.orders = value;
    // this.ordersSubject.next(value);
  }

  get Total() {
    return this.total;
  }

  set Total(value: number) {
    this.total = value;
    // this.totalSubject.next(value);
  }

  addOrder(order: ProductOrder) {
    console.log('addOrder');
    console.log(this.orders.productOrders);

    const orders = new ProductOrders(JSON.parse(localStorage.getItem('commande')));

    if (isNullOrUndefined(orders)) {
      this.orders.productOrders = [];
    }
    orders.productOrders.push(order);
    // this.ordersSubject.next(this.orders);
    // this.productOrderSubject.next(order);
    // console.log(this.orders.productOrders);
    localStorage.setItem('commande', JSON.stringify(orders.productOrders));
  }

    // Méthode calcul du total
    calculateTotal(): number {
      const productOrders = JSON.parse(localStorage.getItem('commande'));
      let sum = 0;
      if (productOrders) {
        productOrders.forEach(value => {
          sum += (value.product.price * value.quantity);
        });
      }
      return sum;
    }


    setTotal(productOrder: ProductOrder) {
      productOrder.totalPrice = productOrder.product.price * productOrder.quantity;
  }
}
