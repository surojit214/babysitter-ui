import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../entity/user/user';

@Injectable({providedIn: 'root'})
export class UserService {

  baseUrl = 'http://localhost:8081/user';
  baseUserTypeUrl = 'http://localhost:8081/usertype/';

  constructor(private httpClient: HttpClient) {
  }

  public get allUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl);
  }

  public createUser(user: User): Observable<HttpResponse<string>>{
    return this.httpClient.post<HttpResponse<string>>(this.baseUrl, user);
  }

  public getUserByType(usertype: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUserTypeUrl}${usertype}`);
  }
}
