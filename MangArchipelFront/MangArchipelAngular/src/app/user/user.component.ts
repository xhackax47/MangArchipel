import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  model: User;
  add: boolean;
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
    private formBuilder: FormBuilder,
    private routeActive: ActivatedRoute,
    private alertService: AlertService) {

    this.model = new User();
  }

  ngOnInit() {

    if (this.route.snapshot.paramMap.get('id') === null) {
      this.add = true;

    } else {


      let id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
      this.service.getUserId(parseInt(this.routeActive.snapshot.paramMap.get('id'))).subscribe(user =>
        this.registerForm.setValue({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          city: user.city,
          adress: user.adress,
          mail: user.mail,
          postalCode: user.postalCode,
          password: user.password
        }));
    }
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    const role = 'ROLE_USER';
    /*
    if (this.registerForm.invalid) {
      return;
    }
    */ console.log(this.add);
    if (this.add) {

      // this.model = new User(this.registerForm.value);
      const user = new User(this.registerForm.value.username,
        this.registerForm.value.firstName, this.registerForm.value.lastName,
        this.registerForm.value.city, this.registerForm.value.postalCode,
        this.registerForm.value.adress, this.registerForm.value.mail, role);
      // this.service.addUser(this.model);
      this.service.addUser(user).subscribe(() => this.router.navigate(['/']));
      localStorage.setItem('loginAct', user.username);
      localStorage.setItem('passwordAct', user.password);
      // localStorage.setItem('roleAct', user.values);
      // this.model = new User();

      this.router.navigate(['/']);

    } else {
      const p = this.model; console.log(this.add);
      
      this.service.getUserId(this.id).subscribe(user => {
        this.service.getUserIdByLogin(localStorage.getItem('loginAct')).subscribe(userr => {
          if (userr) {
            if (user.id === userr.id) {
              this.registerForm.setValue({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                city: user.city,
                adress: user.adress,
                mail: user.mail,
                postalCode: user.postalCode,
                password: user.password
              });
            } else {
              this.router.navigate(['/']);
            }
          }
        });
    /*
        const userUpdated = new User();
        userUpdated.username = this.registerForm.value.username;
        userUpdated.lastName = this.registerForm.value.lastName;
        userUpdated.firstName = this.registerForm.value.firstName;

        userUpdated.password = this.registerForm.value.password;
        userUpdated.mail = this.registerForm.value.mail;
        userUpdated.username = this.registerForm.value.username;
        userUpdated.city = this.registerForm.value.city;
        userUpdated.postalCode = this.registerForm.value.postalCode;

        this.service.updateUser(userUpdated);
        */
      }
    /*
    this.service.registerUser(this.registerForm.value)
      .pipe(first()).subscribe(
        data => {
          this.alertService.success('Inscription réussi', true);
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.add = false;

        });
   */     
  }
    

  }
