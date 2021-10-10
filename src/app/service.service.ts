import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './model';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  baseUrl:string='http://localhost:10531/api';

  getUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(this.baseUrl + '/users');
  }

  setUpdateUser(user: User) {
    return this.httpClient.post(this.baseUrl + '/users/save', user,{responseType: 'text'});
  }

  deleteUser(id:any) {
    return this.httpClient.post(this.baseUrl + '/users/delete/' + id, null, {responseType: 'text'});
  }

  getContents(): Observable<Array<Content>> {
    return this.httpClient.get<Array<Content>>(this.baseUrl + '/contents');
  }

  getContent(id:number): Observable<Content> {
    return this.httpClient.get<Content>(this.baseUrl + '/contents/' + id);
  }

  setUpdateContent(content: Content) {
    return this.httpClient.post(this.baseUrl + '/contents/save', content,{responseType: 'text'});
  }

  deleteContent(id:any) {
    return this.httpClient.post(this.baseUrl + '/contents/delete/' + id, null,{responseType: 'text'});
  }

  TOKEN_KEY = 'token';

  signin(user:User){
    return this.httpClient.post(this.baseUrl + '/users/signin', user,{responseType: 'text'});
  }

  logIn(log:any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(this.baseUrl + '/users/login', log, { headers: headers, responseType: 'text' });
  }

  saveToken(token:any) {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return this.token != null;
  }

  get role() :any {
    if (this.token) {
      var decoded = jwt_decode(this.token);
      return decoded;
  }
    return "";
  }
}
