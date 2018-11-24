

import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
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
  productOrders: ProductOrder[] = [];
  selectedProductOrder: ProductOrder;
  private cartOrders: ProductOrders;
  productSelected: Boolean = false;
  sub: Subscription;
  quantity: number;

  constructor(private productService: ProductService,
    private orderService: OrderService,
    private route: ActivatedRoute) {
    this.product = new Product();
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    this.productService.getProductById(id).subscribe(p => this.product = p);
  }

  addToCart(order: ProductOrder) {
    const productOrder: ProductOrder = order;
    this.orderService.SelectedProductOrder = order;
    this.selectedProductOrder = this.orderService.SelectedProductOrder;
    this.productOrders.push(productOrder);
    this.productSelected = true;
    this.orderService.addOrder(productOrder);
    localStorage.setItem('commande', JSON.stringify(this.productOrders));
  }

  getProductIndex(product: Product): number {
    return this.orderService.ProductOrders.productOrders.findIndex(
      value => value.product === product);
  }

  isProductSelected(product: Product): boolean {
    return this.getProductIndex(product) > -1;
  }

}

