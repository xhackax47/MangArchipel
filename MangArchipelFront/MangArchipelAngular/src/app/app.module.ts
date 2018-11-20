
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MenubarModule} from 'primeng/menubar';
import { AppRoutingModule } from './app-routing.module';
import {DataTableModule} from 'primeng/datatable';

import { MenuBarDetailsComponent } from './menu-bar-details/menu-bar-details.component';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Route } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';

import {CheckboxModule} from 'primeng/checkbox';
import { MenuAdministrateurComponent } from './menu-administrateur/menu-administrateur.component';

import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { SearchProductComponent } from './search-product/search-product.component';

const roads: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginFormComponent},
  { path: 'product/:id', component: ProductDetailComponent},
  { path: 'search', component: SearchProductComponent},
  // { path: 'profile', component: ProfileComponent},
  // { path: 'orders', component: OrdersComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductDetailComponent,
    ProductsComponent,
    CartComponent,
    LoginFormComponent,
    MenuBarDetailsComponent,
    MenuAdministrateurComponent,
    SearchProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    RouterModule.forRoot(roads),
    FormsModule,
    HttpClientModule,
    NgbModule,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

