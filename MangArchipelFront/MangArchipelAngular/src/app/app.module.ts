import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MenubarModule} from 'primeng/menubar';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Route } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';

import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
const roads: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginFormComponent}
  // { path: 'product', component: ProductComponent},
  // { path: 'search', component: SearchComponent},
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
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    RouterModule.forRoot(roads),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
