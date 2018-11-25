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
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required,Validators.minLength(6)],
      confirmpassword: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      adress: ['', Validators.required],
    },{validator: this.service.confirmPassword('password', 'confirmassword')}
    );
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    if (this.add) {
      console.log('coucou');
      this.model=new User(this.registerForm.value);
      this.service.addUser(this.model);
      this.model = new User();
      this.router.navigate(['/']);
    }
   else{
      const p = this.model;
      this.service.updateUser(p.id,p);
    }
    this.service.registerUser(this.registerForm.value)
      .pipe(first()).subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
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
