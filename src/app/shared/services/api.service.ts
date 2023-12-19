import { Injectable, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from '../global';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders().set('Authorization', `Bearer ${global.token}`);
  
  constructor(
    protected httpClient: HttpClient
  ) { }


	getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(global.api_url, { headers: this.headers });
  }

  getUser(userLogin: string): Observable<User> {
    return this.httpClient.get<User>(global.api_url+ '/' + userLogin, { headers: this.headers });

  }

  getUsersByInput(text: string): Observable<any> {
    return this.httpClient.get<any[]>(global.api_search_url+ '?q=' + text, { headers: this.headers });

  }

}
