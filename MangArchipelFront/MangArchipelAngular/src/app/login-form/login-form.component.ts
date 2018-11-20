
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

