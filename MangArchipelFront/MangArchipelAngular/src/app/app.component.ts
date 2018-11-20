
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MangArchipel';
  logged: boolean;
  admin: boolean;

  constructor() {
    this.logged = false;
    this.admin = false;
  }
}

