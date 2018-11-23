import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menu-bar-details',
  templateUrl: './menu-bar-details.component.html',
  styleUrls: ['./menu-bar-details.component.css']
})
export class MenuBarDetailsComponent implements OnInit {

  constructor(private userService: UserService) {}

  items: MenuItem[];

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
            routerLink: '/orders'
          }
        ]
      },
      {
        label: 'Panier',
        routerLink: '/cart'
      }
    ];
  }

  logout() {
    console.log('tentative de déconecction');
    this.userService.logout().subscribe(() => {
      localStorage.removeItem('USER');
      this.userService.subjectLog.next(false);
    });
  }
}
