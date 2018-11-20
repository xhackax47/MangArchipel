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

  url = 'http://localhost:8098/api/products';
  httpOptions = {
    headers: new HttpHeaders().set('Content-type', 'application/json')
  };

  constructor(private http: HttpClient, private router: Router) { }

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
    return this.http.get<Product>(this.url + '/' + id, this.httpOptions);
  }


  getProductBy(product: String): Observable<Product[]> {
    if (!product.trim()) {
      return of([]);
    }
    // return this.http.get<Product[]>
  }

}
