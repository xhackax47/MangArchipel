import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'localhost:8098/login';
  constructor(private http: HttpClient) { }
  getUserByLogin(login: string, password: string): Observable<User> {
    return this.http.get<User>(this.url);
  }

  loging(user: User): void {
  this.http.post<User>(this.url, user);
  }

}

