import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarDetailsComponent } from './menu-bar-details/menu-bar-details.component';

import { MenubarModule } from 'primeng/menubar';
import { MenuAdministrateurComponent } from './menu-administrateur/menu-administrateur.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SearchProductComponent } from './search-product/search-product.component';
import { CheckboxConfigurableComponent } from './checkbox-configurable/checkbox-configurable.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuBarDetailsComponent,
    MenuAdministrateurComponent,
    SearchProductComponent,
    CheckboxConfigurableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
