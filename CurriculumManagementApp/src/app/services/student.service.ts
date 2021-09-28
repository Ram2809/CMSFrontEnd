import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { Response } from '../model/response';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:8081/api/student'
  constructor(private http: HttpClient) { }
  addStudent(student: Student): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, student)
  }
  getStudents(roomNo: number): Observable<Response> {
    return this.http.get(`${this.baseUrl}` + '/' + `${roomNo}`)
  }
  deleteStudent(rollNo: number): Observable<Response> {
    return this.http.delete(`${this.baseUrl}` + '/' + `${rollNo}`)
  }
}
