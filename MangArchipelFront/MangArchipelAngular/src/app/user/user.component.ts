import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  message: string;
  model: User;
  add: Boolean;
  id: number;
  registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    mail: ['', Validators.compose([Validators.email, Validators.required])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    confirmpassword: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    adress: ['', Validators.required],

  }, { validator: this.service.confirmPassword('password', 'confirmpassword') }
  );
  constructor(private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.model = new User();
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') === null) {
      this.add = true;

    } else {
      this.add = false;
      const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
      this.service.getUserId(id).subscribe(user => this.model = user);
    }
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    const role = 'ROLE_USER';

    if (this.add) {

      const user = new User(this.registerForm.value.username,
        this.registerForm.value.firstName, this.registerForm.value.lastName,
        this.registerForm.value.city, this.registerForm.value.postalCode,
        this.registerForm.value.adress, this.registerForm.value.mail, role);

      this.service.addUser(user).subscribe(() => this.router.navigate(['/']));
      localStorage.setItem('loginAct', user.username);
      localStorage.setItem('passwordAct', user.password);

      this.router.navigate(['/']);

    } else {
      const p = this.model;

    }
    this.service.registerUser(this.registerForm.value)
      .pipe(first()).subscribe(
        error => {
          this.message = 'Echec de l\'inscription';
          this.add = false;

        });
  }
  /*if else{
     const p = this.model;
     this.servic
   }

  this.service.addUser(this.registerForm.value).subscribe(
               error => {
                   this.alertService.error(error);
                   this.add = false;
               });
                */

}
