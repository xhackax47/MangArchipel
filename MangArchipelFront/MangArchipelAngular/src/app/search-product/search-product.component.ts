
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  product: Product;
  checkValue: any;
  productArray;

  constructor(private service: ProductService) {
    this.productArray = [];
  }

  ngOnInit() {
    // this.service.getProductsById();
  }
  onSubmit() {
    // this.service.getProductBy(this.productArray).subscribe();
    console.log('toto');
    this.service.productFilterName(this.checkValue).subscribe(p => this.productArray = p);
  }
}
