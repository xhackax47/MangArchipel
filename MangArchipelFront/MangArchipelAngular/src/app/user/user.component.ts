import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  model: User;
  add: Boolean;
  constructor(private service: UserService, private router: Router, private route: ActivatedRoute) {
    this.model = new User();
  }

  ngOnInit() {
    /*if (this.route.snapshot.paramMap.get('id') === null) {
      this.add = true;
    } else {
      this.add = false;
      const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
      this.service.getUser().subscribe();
    }
*/
  }

  onSubmit() {
    if (this.add) {
      console.log('coucou');
      this.service.addUser(this.model);
      this.model = new User();
      this.router.navigate(['/']);
    }
    /*else{
      const p = this.model;
      this.servic
    }
    */
  }
}
