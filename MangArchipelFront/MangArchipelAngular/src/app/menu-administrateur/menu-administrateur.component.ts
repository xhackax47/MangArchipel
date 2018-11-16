import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-administrateur',
  templateUrl: './menu-administrateur.component.html',
  styleUrls: ['./menu-administrateur.component.css']
})
export class MenuAdministrateurComponent implements OnInit {

  items: MenuItem[];
  ngOnInit() {
    this.items = [
      { label: 'Categorie' },
      {
        label: 'Administration',
        items: [
          { label: 'Gestions des produits' },
          { label: 'Commandes' }
        ]
      }
    ];
  }

}
