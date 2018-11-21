import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {
  logged: boolean;
  admin: boolean;
  product: Product;
  productArray: Array<Product>;
  products: Product[];

  constructor(private service: ProductService, private router: Router, private userService: UserService) {
    this.productArray = [];

    this.logged = false;

    const u: User = JSON.parse(localStorage.getItem('USER'));
    if (u !== null) {
      this.logged = true;
      if (u.roles.length > 0 && u.roles[0].name === 'ROLE_ADMIN') {
        this.admin = true;
      }
    }


    userService.observeLog.subscribe(logged => {
      this.logged = logged;

      const user: User = JSON.parse(localStorage.getItem('USER'));
      if (user !== null) {
        if (u.roles.length > 0 && u.roles[0].name === 'ROLE_ADMIN') {
          this.admin = true;
        }
      }
    }
    );
  }

  ngOnInit(): void {
    this.refreshComponent();
  }

  onRowSelect(event) {
    this.router.navigate(['product', this.product.id]);
  }


  pageChanged(event) {
    this.products = this.productArray.slice(event.first, event.first + event.rows);
  }

  onClickParent(product: Product) {
    this.refreshComponent();
  }

  lock(id: number) {
    this.service.setVisible(id, false).subscribe(() => {
      this.refreshComponent();
    });
  }


  unlock(id: number) {
    this.service.setVisible(id, true).subscribe(() => {
      this.refreshComponent();
    });
  }

  predicateForSort(p1: Product, p2: Product): number {
    if (p1.id > p2.id) {
      return 1;
    } else if (p1.id < p2.id) {
      return -1;
    } else {
      return 0;
    }
  }

  refreshComponent() {
    this.service.getProducts().subscribe(p => {
      this.productArray = p.sort(this.predicateForSort);
      this.products = this.productArray.slice(0, 20);
    });
  }
}
