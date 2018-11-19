<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  model: User;
  logged: Boolean;
  loginform: LoginFormComponent;
  constructor(private service: UserService,
    private router: Router,
  ) {
    this.model = new User('', '');
    this.logged = false;
    if (localStorage.getItem('USER') !== null) {
      console.log(localStorage.getItem('USER'));
      this.logged = true;
    }
  }

  ngOnInit() {
    this.logged = false;
    if (localStorage.getItem('USER') !== null) {
      console.log(localStorage.getItem('USER'));
      this.logged = true;
    }
  }

  onSubmit() {
    console.log('coucou');
    this.service.loging(this.model).subscribe(user => {
      console.log(user);
      if (user.username !== undefined) {
        localStorage.setItem('USER', user.toString());
        this.logged = true;
      }

    });

    /*
    this.service.getUserByLogin(this.model.login).subscribe(
      userRecu => {
        if (this.model.password === userRecu.password && sessionStorage.getItem('user') === null) {
          this.logged = true;
          sessionStorage.setItem('login', this.model.login);
          this.router.navigate(['/']);
        } else {
          this.logged = false;
        }
      });
      */
  }

  logout() {
    console.log('tentative de déconecction');
    this.service.logout().subscribe(() => {
      this.logged = false;
      localStorage.removeItem('USER');
    });
  }
}
=======

import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  model: User;
  logged: Boolean;
  loginform: LoginFormComponent;
  constructor(private service: UserService,
    private router: Router,
  ) { this.model = new User('', ''); }

  ngOnInit() {
  }

  onSubmit() {
    console.log('coucou');
    this.service.loging(this.model).subscribe();

    /*
    this.service.getUserByLogin(this.model.login).subscribe(
      userRecu => {
        if (this.model.password === userRecu.password && sessionStorage.getItem('user') === null) {
          this.logged = true;
          sessionStorage.setItem('login', this.model.login);
          this.router.navigate(['/']);
        } else {
          this.logged = false;
        }
      });
      */
  }

  logout() {
    console.log('tentative de déconecction');
    this.service.logout().subscribe();
  }
}

>>>>>>> ced6d1cbcf30191357efe1fc7a9c8f5266a55fde
