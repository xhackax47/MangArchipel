

import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductOrder } from '../product-order';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';
import { ProductOrders } from '../product-orders';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;

  productArray: Array<Product>;
  products: Product[];
  // productOrders: ProductOrder[] = [];
  selectedProductOrder: ProductOrder;
  productSelected: Boolean = false;
  sub: Subscription;
  quantity: number;
  message: string;

  constructor(private productService: ProductService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router) {
    this.product = new Product();
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    this.productService.getProductById(id).subscribe(p => this.product = p);
  }

  addToCart(product: Product) {
    if (this.quantity) {   const productOrder: ProductOrder = new ProductOrder(product, this.quantity);
      this.orderService.addOrder(productOrder);
      this.router.navigate(['/cart']);
    } else {
      this.message = 'Vous devez indiquer une quantité';
    }
  }

  getProductIndex(product: Product): number {
    return this.orderService.ProductOrders.productOrders.findIndex(
      value => value.product === product);
  }

}

