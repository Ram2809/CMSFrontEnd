import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { Response } from '../model/response';
import { UrlUtil } from '../model/url-util';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'student';
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
  getStudent(rollNo: number): Observable<Response> {
    return this.http.get(`${this.baseUrl}?rollNo=${rollNo}`);
  }
  updateStudent(rollNo: number, student: Student): Observable<Response> {
    return this.http.put(`${this.baseUrl}/${rollNo}`, student);
  }
}
