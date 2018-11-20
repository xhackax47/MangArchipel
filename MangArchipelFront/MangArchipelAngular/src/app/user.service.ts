
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8098/api/users';
  constructor(private http: HttpClient) { }
  getUserByLogin(login: string, password: string): Observable<User> {
    return this.http.get<User>(this.url + login);
  }

  loging(user: User):  Observable<User> {
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

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

