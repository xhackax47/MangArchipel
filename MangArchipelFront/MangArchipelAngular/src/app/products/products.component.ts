

import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product: Product;
  productArray: Array<Product>;
  products: Product[];
  types: SelectItem[];
  yearFilter: number;
  yearTimeout: any;

  constructor(private service: ProductService, private router: Router) {
    this.productArray = [];
  }

  ngOnInit(): void {
    this.service.getProducts().subscribe(p => {
      this.productArray = p.filter(product => product.visible);
      this.products = this.productArray.slice(0, 20);
    });
    this.types = [];
    this.types.push({label: 'Tous les types', value: null});
    this.types.push({label: 'Mangas', value: 'Mangas'});
    this.types.push({label: 'Animes/Films', value: 'Animes/Films'});
    this.types.push({label: 'CD/Musiques', value: 'CD/Musiques'});
    this.types.push({label: 'Figurines', value: 'Figurines'});
    this.types.push({label: 'Jeux', value: 'Jeux'});
  }

  onRowSelect(event) {
    this.router.navigate(['product', this.product.id]);
  }
  onYearChange(event, dt, col) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }
    this.yearTimeout = setTimeout(() => {
      dt.filter(event.value, col.field, col.filterMatchMode);
    }, 250);
  }

  pageChanged(event) {
    this.products = this.productArray.slice(event.first, event.first + event.rows);
  }

}

