import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:8098';
  httpOptions = {
    headers: new HttpHeaders().set('Content-type', 'application/json')
  };

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url + '/api/products', this.httpOptions);
  }

  getProductsById(id: Number): Observable<Product> {
    return this.http.get<Product>(this.url + id);
  }

}
