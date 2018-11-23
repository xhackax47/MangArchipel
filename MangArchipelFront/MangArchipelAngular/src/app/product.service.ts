
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:8098/api/products';
  httpOptions = {
    headers: new HttpHeaders().set('Content-type', 'application/json')
  };

  constructor(private http: HttpClient, private router: Router) { }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url + '/', this.httpOptions);
  }

  deleteProduct(id: number): Observable <boolean> {
    return this.http.delete<boolean>(this.url + '/' + id, this.httpOptions);
  }

  getProductById(id: Number): Observable<Product> {
    return this.http.get<Product>(this.url + '/' + id, this.httpOptions);
  }

  getProductsBy(arrayProduct: Product[]): Observable<Product> {
    return this.http.get<Product>(this.url + '/' + arrayProduct);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url + '/', product, this.httpOptions);
  }

  setVisible(id: number, visible: boolean) {
    return this.http.post<Product>(this.url + '/visible/' + id, visible, this.httpOptions);
  }

}
