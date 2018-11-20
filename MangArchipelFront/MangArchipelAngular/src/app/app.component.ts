

import { Component } from '@angular/core';

import { UserService } from './user.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MangArchipel';
  logged: boolean;
  admin: boolean;


  constructor(private userService: UserService) {
    this.logged = true;
    this.admin = true;

 //  Observable<string> o = of(localStorage.)
  }
}

