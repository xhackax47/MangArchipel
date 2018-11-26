import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menu-administrateur',
  templateUrl: './menu-administrateur.component.html',
  styleUrls: ['./menu-administrateur.component.css']
})
export class MenuAdministrateurComponent implements OnInit {

  @Input() product: Product[];
  items: MenuItem[];
  checkValue: string;

  constructor(private service: ProductService, private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Produits',
        routerLink: '/'
      },
      {
        label: 'Administration',
        items: [
          {
            label: 'Gestions des produits',
            routerLink: '/admin/products'
          },
          { label: 'Commandes',
          routerLink: '/admin/orders'}
        ]
      }
    ];
  }
  onSubmit() {
    this.service.productFilterName(this.checkValue).subscribe(
      p => {
        this.product = p;
        this.service.emit(this.product);
      }
    );
    this.router.navigate(['search']);
  }

  logout() {
    console.log('ATTEMPT LOGOUT');
    this.userService.logout().subscribe(() => {
      localStorage.removeItem('USER');
      this.userService.subjectLog.next(false);
    });
  }

}
