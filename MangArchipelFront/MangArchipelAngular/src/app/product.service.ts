
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:8098/api/products';
  httpOptions = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
    params: new HttpParams()
  };

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url + '/');
  }

  deleteProduct(id: number) {
    this.http.delete(this.url + '/' + id);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + '/' + id);
  }

  getProductsById(id: Number): Observable<Product> {
    return this.http.get<Product>(this.url + id);
  }

  // getProductBy(arrayProduct: Product[]): Observable<Product> {
  //   return this.http.get<Product>(this.url + '/' + arrayProduct);
  // }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url + '/', product);
  }

  productFilterName(name?: string): Observable<Array<Product>>  {
    return this.http.get<Array<Product>>(this.url + '/',
      { headers: this.httpOptions.headers, params: {
        productName: name
      }});
  }
  productFilterBrand(brand?: string): Observable<Array<Product>>  {
    return this.http.get<Array<Product>>(this.url + '/',
      { headers: this.httpOptions.headers, params: {
        brand: brand
      }});
  }
}
