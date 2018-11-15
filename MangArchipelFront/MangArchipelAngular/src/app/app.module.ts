import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MenubarModule} from 'primeng/menubar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Route } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { LoginFormComponent } from './login-form/login-form.component';

const roads: Route = [
  { path: '', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductDetailComponent,
    ProductsComponent,
    CartComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    RouterModule.forRoot(roads),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
