

import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { ProductOrder } from '../product-order';
import { ProductOrders } from '../product-orders';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product: Product;
  productArray: Array<Product>;
  products: Product[];
  productOrders: ProductOrder[] = [];
  selectedProductOrder: ProductOrder;
  private cartOrders: ProductOrders;
  productSelected: Boolean = false;
  sub: Subscription;

  constructor(private productService: ProductService, private orderService: OrderService, private router: Router) {
    this.productArray = [];
  }

  ngOnInit(): void {
    this.productOrders = [];
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(p => {
      this.productArray = p.filter(product => product.visible);
      this.products = this.productArray.slice(0, 20);
    });
  }

  loadOrders() {
    this.sub = this.orderService.ordersChanged.subscribe(() => {
      this.cartOrders = this.orderService.ProductOrders;
    });
  }

  onRowSelect(event) {
    this.router.navigate(['product', this.product.id]);
  }


  pageChanged(event) {
    this.products = this.productArray.slice(event.first, event.first + event.rows);
  }

}

