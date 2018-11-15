import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarDetailsComponent } from './menu-bar-details/menu-bar-details.component';

import { MenubarModule } from 'primeng/menubar';



@NgModule({
  declarations: [
    AppComponent,
    MenuBarDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
