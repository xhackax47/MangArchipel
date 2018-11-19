
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product: Product;
  productArray: Array<Product>;

  constructor(private service: ProductService) {
    this.productArray = [];
   }

  ngOnInit(): void {
    this.service.getProducts().subscribe(p => this.productArray = p);
  }

  onClickParent(product: Product) {
    console.log('product ajouté');
      this.productArray.push(product);
  }

}

