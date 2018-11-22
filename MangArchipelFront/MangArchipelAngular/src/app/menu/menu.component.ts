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
  @Output() output = new EventEmitter;
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

  onSubmit() {
    this.service.productFilterName(this.checkValue).subscribe(p => { this.product = p; this.output.emit(this.product);
    console.log(this.product); });
    this.router.navigate(['search']);
  }
}
