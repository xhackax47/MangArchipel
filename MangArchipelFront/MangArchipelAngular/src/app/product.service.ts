
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from './product';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private source = new Subject<Product[]>();
  public event$ = this.source.asObservable();

  url = 'http://localhost:8098/api/products';
  httpOptions = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
    params: new HttpParams()
  };

  constructor(private http: HttpClient) { }

  // Permet de faire la recherche depuis n'importe où via le menu
  emit(eventData: Product[]): void {
    this.source.next(eventData);
  }

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

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url + '/', product);
  }

  productFilterName(name?: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url + '/',
      {
        headers: this.httpOptions.headers, params: {
          productName: name
        }
      });
  }
  productFilterBrand(brand?: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url + '/',
      {
        headers: this.httpOptions.headers, params: {
          brand: brand
        }
      });
  }
}
