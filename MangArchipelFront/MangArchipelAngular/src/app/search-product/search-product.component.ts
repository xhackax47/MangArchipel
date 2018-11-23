
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

import { HttpResponse } from '@angular/common/http';
import { ValueTransformer } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  @Input() checkValue;
  productArray;
  product: Product;
  products;

  constructor(private service: ProductService, private router: Router) {
    service.event$.subscribe(product => this.productArray = product.filter(p => p.visible));
  }

  ngOnInit() {
  }

  onRowSelect(event) {
    this.router.navigate(['product', this.product.id]);
  }
}
