import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-menu-bar-details',
  templateUrl: './menu-bar-details.component.html',
  styleUrls: ['./menu-bar-details.component.css']
})
export class MenuBarDetailsComponent implements OnInit {

  user = new User();

  id: number ;

  @Input() product: Product[];
  checkValue: string;
  items: MenuItem[];

  constructor(private service: ProductService, private router: Router,
    private userService: UserService) {
      const user: User = JSON.parse( localStorage.getItem('USER'));
      this.id = user.id;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Produits',
        routerLink: '/'
      },
      {
        label: 'Mon compte',
        items: [
          {
            label: 'Profil',
            routerLink: '/profile'
          },
          {
            label: 'Mes commandes',
            routerLink: '/user/order/' + this.id
          }
        ]
      },
      {
        label: 'Panier',
        routerLink: '/cart'
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
    console.log('tentative de déconecction');
    this.userService.logout().subscribe(() => {
      localStorage.removeItem('USER');
      this.userService.subjectLog.next(false);
    });
  }

}
