import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:8098/api/products';
  httpOptions = {
    headers: new HttpHeaders().set('Content-type', 'application/json')
  };

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url + '/', this.httpOptions);
  }

  deleteProduct(id: number) {
    this.http.delete(this.url + '/' + id, this.httpOptions);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + '/' + id, this.httpOptions);
  }

  getProductsById(id: Number): Observable<Product> {
    return this.http.get<Product>(this.url + id);
  }

  getProductBy(arrayProduct: Product[]): Observable<Product> {
    console.log(arrayProduct);
    return this.http.get<Product>(this.url + '/');
  }

}
