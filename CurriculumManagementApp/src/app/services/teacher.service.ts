import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../model/teacher';
import { Response } from '../model/response';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl='http://localhost:8081/api/teacher'
  constructor(private http:HttpClient) { }
  addStaff(teacher:Teacher):Observable<Response>
  {
    return this.http.post(`${this.baseUrl}`,teacher);
  }
}
