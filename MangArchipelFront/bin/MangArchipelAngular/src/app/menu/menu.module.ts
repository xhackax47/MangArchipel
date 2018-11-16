import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenubarModule } from 'primeng/components/menubar/menubar';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenubarModule
  ]
})
export class MenuModule { }
