

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

    const user: User = JSON.parse(localStorage.getItem('USER'));
    if (user !== null) {
      this.logged = true;
      if (user.roles.length > 0 && user.roles[0].name === 'ROLE_ADMIN') {
        this.admin = true;
      }
    }


    userService.observeLog.subscribe(logged => {
      this.logged = logged;
      const user2: User = JSON.parse(localStorage.getItem('USER'));
      if (user2 !== null) {
        if (user2.roles.length > 0 && user2.roles[0].name === 'ROLE_ADMIN') {
          this.admin = true;
        }
      }
    }
    );
  }


}

