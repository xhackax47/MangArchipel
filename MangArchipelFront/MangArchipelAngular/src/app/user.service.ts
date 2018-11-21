
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8098/api/users';
  urlRetour = 'http://localhost:8098/api/';
  httpOptions = {
    headers: new HttpHeaders().set('Content-type', 'application/json')
  };


  constructor(private http: HttpClient, private router: Router) { }
  getUserByLogin(login: string, password: string): Observable<User> {
    return this.http.get<User>(this.url + login);
  }

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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  addUser(user: User): void {
    this.http.post(this.url + '/signIn', this.httpOptions).subscribe(() => this.router.navigate(['/']));
  }
  updatePony(id: number, user: User): void {
    this.http.put(this.url + '/' + id, user, this.httpOptions).subscribe(() => this.router.navigate(['/']));
  }
}

