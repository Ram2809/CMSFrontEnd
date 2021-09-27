import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../model/response';
import { Login } from '../model/login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl='http://localhost:8081/api/login';
  constructor(private http:HttpClient) { }
  addLogin(login:Login):Observable<Response>
  {
    return this.http.post(`${this.baseUrl}`,login);
  }
}
