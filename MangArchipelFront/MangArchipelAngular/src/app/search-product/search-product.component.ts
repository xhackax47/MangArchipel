
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { HttpResponse } from '@angular/common/http';
import { ValueTransformer } from '@angular/compiler/src/util';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  @Input() value;
  productArray;
  product: Product;
  products;

  constructor(private service: ProductService) {
    this.products = [];
    console.log(this.value);
  }

  ngOnInit() {
    // this.service.getProductsById();
    this.service.productFilterName(this.value).subscribe(p => this.products = p);
  }
  // onSubmit() {
  //   // this.service.getProductBy(this.productArray).subscribe();
  //   console.log('toto');
  //   this.service.productFilterName(this.checkValue).subscribe(p => this.productArray = p);
  // }
}
