
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  logged: boolean;
  subjectLog: Subject<boolean>;
  observeLog: Observable<boolean>;

  url = 'http://localhost:8098/api/users';

  constructor(private http: HttpClient, private router: Router) {
    this.logged = false;
    this.subjectLog = new Subject<boolean>();
    this.observeLog = this.subjectLog.asObservable();
  }

  urlRetour = 'http://localhost:8098/api/';
  httpOptions = {
    headers: new HttpHeaders().set('Content-type', 'application/json')
  };

  /*
    getUserByLogin(login: string, password: string): Observable<User> {
      return this.http.get<User>(this.url + login);
    }
  */
  loging(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/login', user);
    // .pipe(catchError((err) => console.log(err)));
  }

  logout(): Observable<User> {
    return this.http.post<User>(this.url + '/logout', '');
    // .pipe(catchError((err) => console.log(err)));
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.url + '/user');
  }
  getUserId(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + id, this.httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  addUser(user: User) {
    return this.http.post(this.url + '/signIn', user, this.httpOptions);
  }

  updateUser(id: number, user: User): void {

    this.http.put(this.url + '/' + id, user, this.httpOptions).subscribe(() => this.router.navigate(['/']));
  }

  registerUser(user: User) {
    return this.http.post(this.url + '/signIn', user, this.httpOptions);
  }
  confirmPassword(password1: string, password2: string) {

    return (group: FormGroup) => {
      const tmp = group.controls[password1];
      const tmp1 = group.controls[password2];
      if (tmp.value !== tmp1.value) {
        return tmp1.setErrors({ notEquivalent: true });
      } else {
        return tmp1.setErrors(null);
      }
    };
  }
  getUserIdByLogin(login: string): Observable<User> {
    return this.http.get<User>(this.url + '/username/' + login);
  }
  updateUser2(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.url + '/update/' + id, user, this.httpOptions);
  }

}
