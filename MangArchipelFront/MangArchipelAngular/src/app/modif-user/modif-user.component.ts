import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modif-user',
  templateUrl: './modif-user.component.html',
  styleUrls: ['./modif-user.component.css']
})
export class ModifUserComponent implements OnInit {
  model: User;
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

  constructor(private service: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    this.model = JSON.parse(localStorage.getItem('USER'));
    this.registerForm = this.formBuilder.group({
      firstName: [this.model.firstName, Validators.required],
      lastName: [this.model.lastName, Validators.required],
      username: [this.model.username, Validators.required],
      mail: [this.model.mail, Validators.compose([Validators.email, Validators.required])],
      password: [this.model.password, Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmpassword: ['', Validators.required],
      city: [this.model.city, Validators.required],
      postalCode: [this.model.postalCode, Validators.required],
      adress: [this.model.adress, Validators.required],
    }, { validator: this.service.confirmPassword('password', 'confirmpassword') }
    );
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    // this.service.getUserIdByLogin(localStorage.getItem('USER')).subscribe(user => this.model = user);
  }
  onSubmit() {
    console.log(this.model);
    this.service.updateUser2(this.model.id, this.registerForm.value).subscribe(user => {
      localStorage.setItem('USER', JSON.stringify(user));
      this.router.navigate(['/']);
    });
  }
}
