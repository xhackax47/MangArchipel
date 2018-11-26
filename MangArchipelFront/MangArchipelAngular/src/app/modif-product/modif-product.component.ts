import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modif-product',
  templateUrl: './modif-product.component.html',
  styleUrls: ['./modif-product.component.css']
})
export class ModifProductComponent implements OnInit {
  model: Product;

  @Output() envoi = new EventEmitter<Product>();

  constructor(private service: ProductService, private route: ActivatedRoute , private router: Router) {

    this.model = new Product();
  }

  ngOnInit() {
    const id = parseInt( this.route.snapshot.paramMap.get('id'), 0);
    this.service.getProductById(id).subscribe(product => this.model = product );
  }

  onSubmit() {
    this.service.updateProduct(this.model.id, this.model).subscribe(product => {
      console.log('produit modifié');
      this.router.navigate(['/admin/products']);
    }

    );

  }

  onUpload(event) {
    const httpRequest: XMLHttpRequest = event.xhr;
   this.model.picture = httpRequest.responseText.toString();
  }

}
