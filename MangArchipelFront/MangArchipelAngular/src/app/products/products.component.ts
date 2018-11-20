

import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product: Product;
  productArray: Array<Product>;
  products: Product[];

  constructor(private service: ProductService, private router: Router) {
    this.productArray = [];
  }

  ngOnInit(): void {
    this.service.getProducts().subscribe(p => {
      this.productArray = p;
      this.products = this.productArray.slice(0, 20);
    });
  }

  onRowSelect(event) {
    this.router.navigate(['product', this.product.id]);
}


  pageChanged(event) {
    this.products = this.productArray.slice(event.first, event.first + event.rows);
  }

  onClickParent(product: Product) {
    console.log('product ajouté');
    this.service.getProducts().subscribe(p => {
      this.productArray = p;
      this.products = this.productArray.slice(0, 20);
    });
  }

}

