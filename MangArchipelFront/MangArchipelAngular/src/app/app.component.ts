<<<<<<< HEAD

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MangArchipel';
  logged: boolean;
  admin: boolean;

  constructor() {
    this.logged = true;
    this.admin = true;
  }
}

=======

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MangArchipel';
  logged: boolean;
  admin: boolean;

  constructor() {
    this.logged = false;
    this.admin = false;
  }
}

>>>>>>> 2d71d9694e7bced0f656b66eef36dc578fc37a1f
