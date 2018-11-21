

import { Component } from '@angular/core';
import { UserService } from './user.service';
import { of } from 'rxjs';
import { User } from './user';

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
    this.logged = false;

    const u: User = JSON.parse(localStorage.getItem('USER'));
    if (u !== null) {
      this.logged = true;
      if (u.username === 'ADMIN') {
        this.admin = true;
      }
    }


    userService.observeLog.subscribe(logged => {
      this.logged = logged;
      console.log(logged);
      const user: User = JSON.parse(localStorage.getItem('USER'));
      if (user !== null) {
        if (user.username === 'ADMIN') {
          this.admin = true;
        }
      }
    }
    );
  }


}

