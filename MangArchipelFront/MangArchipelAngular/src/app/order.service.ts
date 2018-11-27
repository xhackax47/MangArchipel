import { Injectable } from '@angular/core';
import { ProductOrder } from './product-order';
import { ProductOrders } from './product-orders';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Order } from './order';
import { isNullOrUndefined } from 'util';
import { User } from './user';
// import { userInfo } from 'os';

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
    if (localStorage.getItem('USER')) {
      const user: User = JSON.parse(localStorage.getItem('USER'));
      return this.http.post(this.url + '/' + user.id, order, this.httpOptions);
    }
  }
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(this.url + '/' + id, this.httpOptions);
  }


  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(this.url + '/' + id, this.httpOptions);

  getOrders(): Observable<Array<ProductOrder>> {
    return this.http.get<Array<ProductOrder>>(this.url + '/', this.httpOptions);
  }

   getOrdersByUserId(id: number): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(this.url + '/ByUserId/' + id, this.httpOptions);
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
