import { Component, OnInit } from '@angular/core';
import {CheckboxModule} from 'primeng/checkbox';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  checkValue: any;
  constructor() { }

  ngOnInit() {
  }

}
