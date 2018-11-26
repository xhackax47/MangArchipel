import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() product: Product[];
  checkValue: string;
  items: MenuItem[];

  constructor(private service: ProductService, private router: Router) {

  }

  ngOnInit() {
    this.items = [{
      label: 'Produits',
      routerLink: '/'
    },
    {
      label: 'Panier',
      routerLink: '/cart'
    }];
  }

  // A mettre dans tous les menus
  onSubmit() {
    this.service.productFilterName(this.checkValue).subscribe(
      p => {
        this.product = p;
        this.service.emit(this.product);
      }
    );
    this.router.navigate(['search']);
  }
}
