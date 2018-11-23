
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  model: Product;

  @Output() envoi = new EventEmitter<Product>();

  constructor(private service: ProductService) {

    this.model = new Product();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.model.visible = true;
    this.service.addProduct(this.model).subscribe(product => {
      console.log('product ajouté');
      this.envoi.emit(product);
    }

    );

  }

  onSelect(event) {
    console.log('image ajoutée');
    this.model.image = event.files[0];
    console.log('image ajoutée : ' + this.model.image);
}

}
