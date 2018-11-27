import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenubarModule } from 'primeng/menubar';
import { AppRoutingModule } from './app-routing.module';

import { DataTableModule } from 'primeng/datatable';
import {TableModule} from 'primeng/table';

import { MenuBarDetailsComponent } from './menu-bar-details/menu-bar-details.component';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Route } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CheckboxModule } from 'primeng/checkbox';
import { MenuAdministrateurComponent } from './menu-administrateur/menu-administrateur.component';

import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';

import { from } from 'rxjs';
import { AddProductComponent } from './add-product/add-product.component';

import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { SearchProductComponent } from './search-product/search-product.component';


import { DataViewModule } from 'primeng/dataview';
import { UserComponent } from './user/user.component';


import { ButtonModule } from 'primeng/button';
import { AlertComponent } from './alert/alert.component';

import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule} from 'primeng/multiselect';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { OrdersComponent } from './orders/orders.component';
import { ModifProductComponent } from './modif-product/modif-product.component';

import {FileUploadModule} from 'primeng/fileupload';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';
import { OrdersUserComponent } from './orders-user/orders-user.component';


import { ReactiveFormsModule } from '@angular/forms';
const roads: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'admin/products', component: ProductsAdminComponent },
  { path: 'admin/product/:id', component: ModifProductComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'search', component: SearchProductComponent },
  { path: 'signIn', component: UserComponent },
  { path: 'orders', component: OrdersComponent},
  { path: 'update', component: UserComponent },
  { path: 'admin/orders', component: OrdersAdminComponent},
  { path: 'user/order/:id', component: OrdersUserComponent}
  // { path: 'profile', component: ProfileComponent},
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
    SearchProductComponent,
    AddProductComponent,
    ProductsAdminComponent,
    UserComponent,
    AlertComponent,
    OrdersComponent,
    ModifProductComponent,
    OrdersAdminComponent,
    OrdersUserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    RouterModule.forRoot(roads),
    FormsModule,
    HttpClientModule,
    NgbModule,
    DataTableModule,
    DataViewModule,

    ButtonModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    MultiSelectModule,
    TableModule,
    FileUploadModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
