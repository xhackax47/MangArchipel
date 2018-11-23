import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menu-administrateur',
  templateUrl: './menu-administrateur.component.html',
  styleUrls: ['./menu-administrateur.component.css']
})
export class MenuAdministrateurComponent implements OnInit {

  items: MenuItem[];

  constructor(private userService: UserService) {}

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

  logout() {
    console.log('ATTEMPT LOGOUT');
    this.userService.logout().subscribe(() => {
      localStorage.removeItem('USER');
      this.userService.subjectLog.next(false);
    });
  }

}
