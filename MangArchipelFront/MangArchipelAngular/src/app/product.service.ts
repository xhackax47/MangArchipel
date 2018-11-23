
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from './product';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

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

  constructor(private http: HttpClient, private router: Router) { }

  // Permet de faire la recherche depuis n'importe où via le menu
  emit(eventData: Product[]): void {
    this.source.next(eventData);
  }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url + '/');
  }


  deleteProduct(id: number): Observable <boolean> {
    return this.http.delete<boolean>(this.url + '/' + id, this.httpOptions);
  }


  getProductById(id: Number): Observable<Product> {
    return this.http.get<Product>(this.url + '/' + id, this.httpOptions);
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
  updateProduct(id: Number, product: Product): Observable<Product> {
    return this.http.put<Product>(this.url + '/' + id, product, this.httpOptions);
  }

  setVisible(id: number, visible: boolean) {
    return this.http.post<Product>(this.url + '/visible/' + id, visible, this.httpOptions);
  }

}
