import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../entity/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  baseUrl = 'http://localhost:8081/user';

  constructor(private httpClient: HttpClient) { }

  public getUserDetails(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}`, user);
  }
}
