import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  product: Product;
  constructor(private service: ProductService, private router: Router , private route: ActivatedRoute) {
    this.product = new Product();
  }

  ngOnInit() {
    // this.service.getProductsById();
  }
  onSubmit() {
  // this.service.getProductBy().subscribe();
  }
}
