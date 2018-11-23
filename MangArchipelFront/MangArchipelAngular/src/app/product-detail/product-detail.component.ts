

import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  constructor(private service: ProductService,
    private route: ActivatedRoute) {
      this.product = new Product();
     }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    this.service.getProductById(id).subscribe(p => this.product = p);
  }

}

