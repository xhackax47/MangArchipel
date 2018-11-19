import { Component, OnInit } from '@angular/core';
import {CheckboxModule} from 'primeng/checkbox';
import { Product } from '../product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  checkValue: any;
  productArray: Array<Product>;
  constructor(private service: ProductService) {
    this.productArray = [];
   }

  ngOnInit() {
   // this.service.getProductsById()
  }

}
