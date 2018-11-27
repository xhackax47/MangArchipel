import { Component, OnInit, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
import { ProductOrders } from '../product-orders';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { ProductService } from '../product.service';
import { ProductOrder } from '../product-order';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderFinished: boolean;
  orders: ProductOrders;
  total: number;
  sub: Subscription;


  constructor(private orderService: OrderService, private router: Router) {
    this.total = 0;
    const orders = new ProductOrders(JSON.parse(localStorage.getItem('commande')));
    orders.productOrders.forEach(orderProduct => {
      orderService.setTotal(orderProduct);
    });
    this.orders = orders;
  }

  // Methode d'initialisation
  ngOnInit() {
    // this.orders.productOrders = JSON.parse(localStorage.getItem('commande'));
  }


  // Methode de retrait d'un produit du panier
  removeFromCart(productOrder: ProductOrder) {
    const index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.orders.productOrders.splice(
        this.getProductIndex(productOrder.product), 1);
    }
    this.orderService.ProductOrders = this.orders;
    localStorage.setItem('commande', JSON.stringify(this.orders.productOrders));
    // this.orders = this.orderService.ProductOrders;
  }

  // Methode de chargement des commandes
  loadProductOrders() {
    this.orders = this.orderService.ProductOrders;
  }

  // Methode de validation du panier / finition de la commande
  validateCart() {
    if (localStorage.getItem('USER')) {
      this.orderFinished = true;
      this.orderService.Total = this.total;
      this.router.navigate(['/orders']);
    }

  }

  // Methode de récupération de l'index d'un produit
  getProductIndex(product: Product): number {
    return this.orderService.ProductOrders.productOrders.findIndex(
      value => value.product === product);
  }

  // Methode de remise à zéro du panier ou "Vider le panier"
  reset() {
    this.orderFinished = false;
    this.orders = new ProductOrders();
    this.orders.productOrders = [];
    localStorage.setItem('commande', '[]');
    this.total = 0;
  }


}
