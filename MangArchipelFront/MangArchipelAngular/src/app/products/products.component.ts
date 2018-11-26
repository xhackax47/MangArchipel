

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

  cols: any[];

  constructor(private service: ProductService, private router: Router) {
    this.productArray = [];
  }

  ngOnInit(): void {
    this.service.getProducts().subscribe(p => {
      this.productArray = p.filter(product => product.visible);
      this.products = this.productArray.slice(0, 20);
    });
    this.types = [
      { label: 'Mangas', value: 'Mangas' },
      { label: 'Animes/Films', value: 'Animes/Films' },
      { label: 'CD/Musiques', value: 'CD/Musiques' },
      { label: 'Figurines', value: 'Figurines' },
      { label: 'Jeux', value: 'Jeux' }
    ];

    this.cols = [
      { field: 'productName', header: 'Produit' },
      { field: 'productType', header: 'Type du produit' }
    ];
  }

  onRowSelect(event) {
    this.router.navigate(['product', this.product.id]);
  }
  onYearChange(event, dt) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      dt.filter(event.value, 'year', 'gt');
    }, 250);
  }

  pageChanged(event) {
    this.products = this.productArray.slice(event.first, event.first + event.rows);
  }

}

