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
  registerForm: FormGroup;
  model: User;
  add: Boolean;


  constructor(private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService) {

    this.model = new User();
  }
  /*
    ngOnInit() {
      if (this.route.snapshot.paramMap.get('id') === null) {
        this.add = true;
      } else {
        this.add = false;
        const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
        this.service.getUser().subscribe();
      }
    }
    */
  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') === null) {
      this.add = true;
      this.registerForm = this.formBuilder.group({
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
    } else {
      this.add = true;
      const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
      // this.service.getUser
    }
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    const role = 'ROLE_USER';
    if (this.registerForm.invalid) {
      return;
    }
    if (this.add) {
      // this.model = new User(this.registerForm.value);
      const user = new User(this.registerForm.value.username,
        this.registerForm.value.firstName, this.registerForm.value.lastName,
        this.registerForm.value.city, this.registerForm.value.postalCode,
        this.registerForm.value.adress, this.registerForm.value.mail, role);
      // this.service.addUser(this.model);
      this.service.addUser(user).subscribe(() => this.router.navigate(['/']));
      // this.model = new User();
      this.router.navigate(['/']);

    } else {
      const p = this.model;
      this.service.updateUser(p.id, p);
    }
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
