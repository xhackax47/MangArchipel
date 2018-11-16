import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar-details',
  templateUrl: './menu-bar-details.component.html',
  styleUrls: ['./menu-bar-details.component.css']
})
export class MenuBarDetailsComponent implements OnInit {


  items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Categorie' },
      {
        label: 'Mon compte',
        items: [
          { label: 'Profil' },
          { label: 'Mes commandes' }
        ]
      },
      { label: 'Panier' }
    ];
  }

}
