import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ProductOrders } from '../product-orders';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { ProductService } from '../product.service';
import { ProductOrder } from '../product-order';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  orderFinished: boolean;
  productSelected: boolean = true;
  orders: ProductOrders;
  total: number;
  sub: Subscription;

  @Output() orderFinishedEvent: EventEmitter<boolean>;


  constructor(private orderService: OrderService, private productService: ProductService) {
    this.total = 0;
    this.orderFinished = false;
    this.orderFinishedEvent = new EventEmitter<boolean>();
  }

  // Methode d'initialisation
  ngOnInit() {
    this.orders = new ProductOrders();
    this.orders.productOrders = [];
    this.loadCart();
    this.orders = this.orderService.ProductOrders;
    this.loadTotal();
  }

  // Methode à la destruction
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Méthode calcul du total
  private calculateTotal(products: ProductOrder[] = []): number {
    let sum = 0;
    products.forEach(value => {
      sum += (value.product.price * value.quantity);
    });
    return sum;
  }

  // Methode de chargement du total pour le ngOnInit
  loadTotal() {
    this.sub = this.orderService.ordersChanged.subscribe(() => {
      this.total = this.calculateTotal(this.orders.productOrders);
    });
  }

  // Methode de chargement du panier pour le ngOnInit
  loadCart() {
    this.sub = this.orderService.productOrderChanged.subscribe(() => {
      const productOrder = this.orderService.SelectedProductOrder;
      console.log(productOrder);
      if (productOrder) {
        this.orders.productOrders.push(productOrder);
      }
      this.orders = this.orderService.ProductOrders;
      this.total = this.calculateTotal(this.orders.productOrders);
      this.orders = JSON.parse(localStorage.getItem('commande'));
    });
  }

  // Methode de retrait d'un produit du panier
  removeFromCart(productOrder: ProductOrder) {
    const index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.orders.productOrders.splice(
        this.getProductIndex(productOrder.product), 1);
    }
    this.orderService.ProductOrders = this.orders;
    this.orders = this.orderService.ProductOrders;
    this.productSelected = false;
  }

  // Methode de chargement des commandes
  loadOrders() {
    this.sub = this.orderService.ordersChanged.subscribe (() => {
      this.orders = this.orderService.ProductOrders;
    });
    this.orders = this.orderService.ProductOrders;
  }

  // Methode de validation du panier / finition de la commande
  finishOrder() {
    this.orderFinished = true;
    this.orderService.Total = this.total;
    this.orderFinishedEvent.emit(this.orderFinished);
  }

  // Methode de remise à zéro du panier ou "Vider le panier"
  reset() {
    this.orderFinished = false;
    this.orders = new ProductOrders();
    this.orders.productOrders = [];
    this.loadTotal();
    this.total = 0;
  }

  getProductIndex(product: Product): number {
    return this.orderService.ProductOrders.productOrders.findIndex(
      value => value.product === product);
  }

}
