
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

import { HttpResponse } from '@angular/common/http';
import { ValueTransformer } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  @Input() checkValue;
  productArray;
  product: Product;
  products;
  types: SelectItem[];
  yearFilter: number;
  yearTimeout: any;
  cols: any[];

  constructor(private service: ProductService, private router: Router) {
    this.service.event$.subscribe(product => this.productArray = product.filter(p => p.visible));
  }

  ngOnInit() {
    this.types = [];
    this.types.push({ label: 'Tous les types', value: null });
    this.types.push({ label: 'Mangas', value: 'Mangas' });
    this.types.push({ label: 'Animes/Films', value: 'Animes/Films' });
    this.types.push({ label: 'CD/Musiques', value: 'CD/Musiques' });
    this.types.push({ label: 'Figurines', value: 'Figurines' });
    this.types.push({ label: 'Jeux', value: 'Jeux' });

    this.cols = [
      { field: 'productName', header: 'Produit' },
      { field: 'productType', header: 'Type du produit' }
    ];
  }

  onYearChange(event, dt) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      dt.filter(event.value, 'year', 'gt');
    }, 250);
  }

  onRowSelect(event) {
    this.router.navigate(['product', this.product.id]);
  }
}
