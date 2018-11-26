

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  model: User;
  logged: Boolean;
  loginform: LoginFormComponent;
  message: string;

  // @Output() envoi = new EventEmitter<User>();
  constructor(private service: UserService,
    private router: Router, private alertService: AlertService) {
    this.model = new User();
    this.message = '';

    this.logged = false;
    const u: User = JSON.parse(localStorage.getItem('USER'));
    if (u !== null) {
      this.logged = true;
    }

    service.observeLog.subscribe(logged => {
      this.logged = logged;
    }
    );


  }

  ngOnInit() {
    this.logged = false;
    if (localStorage.getItem('USER') !== null) {
      console.log(localStorage.getItem('USER'));
      this.logged = true;
    }
  }

  onSubmit() {

    this.service.loging(this.model).subscribe(user => {
      console.log(user);
      if (user.username !== undefined) {
        localStorage.setItem('USER', JSON.stringify(user));
        this.logged = true;
        this.service.logged = true;
        this.service.subjectLog.next(true);
        this.message = '';
        this.router.navigate(['']);
        // this.envoi.emit(user);
      }
    },  error => {this.message = 'Echec de l\'authentification';
      // error => {this.alertService.error(error);
});
  }
}

