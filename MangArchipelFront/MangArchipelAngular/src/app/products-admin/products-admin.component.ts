import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { ConfirmationService } from 'primeng/api';




@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css'],
  providers: [ConfirmationService]
})
export class ProductsAdminComponent implements OnInit {
  logged: boolean;
  admin: boolean;
  product: Product;
  productArray: Array<Product>;
  products: Product[];
  message: string;

  constructor(private service: ProductService, private router: Router, private userService:
     UserService, private confirmationService: ConfirmationService) {
    this.productArray = [];
    this.message = '';
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
    this.loadProducts();
  }

  onRowSelect(event) {
    this.router.navigate(['product', this.product.id]);
  }


  pageChanged(event) {
    this.products = this.productArray.slice(event.first, event.first + event.rows);
  }

  onClickParent(product: Product) {
    this.loadProducts();
  }

  lock(id: number) {
    this.service.setVisible(id, false).subscribe(() => {
      this.loadProducts();
    });
  }


  unlock(id: number) {
    this.service.setVisible(id, true).subscribe(() => {
      this.loadProducts();
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

  loadProducts() {
    this.service.getProducts().subscribe(p => {
      this.productArray = p.sort(this.predicateForSort);
      this.products = this.productArray.slice(0, 20);
    });
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous supprimer ce produit ?',
      accept: () => {
        this.service.deleteProduct(id).subscribe(b => {
          this.message = 'Produit supprimé';
          this.loadProducts();
        });
      }
  });
  }

  update(id: number) {
    this.router.navigate(['/admin/product/' + id ]);
  }
}
