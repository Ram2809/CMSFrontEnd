import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlUtil } from '../model/url-util';
import { TimeTable } from '../model/time-table';
import { Response } from '../model/response';
@Injectable({
  providedIn: 'root'
})
export class TimeTableService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'timetable';
  constructor(private http: HttpClient) { }
  addTimetable(timetable: TimeTable): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, timetable);
  }
  getTimeTable(roomNo: number): Observable<Response> {
    return this.http.get(`${this.baseUrl}/${roomNo}`);
  }
  deleteTimetable(roomNo: number): Observable<Response> {
    return this.http.delete(`${this.baseUrl}/${roomNo}`);
  }
  getTimeTableByDay(roomNo: number, day: string): Observable<Response> {
    return this.http.get(`${this.baseUrl}/${roomNo}/${day}`);
  }
  getPeriod(period: number, id: number): Observable<Response> {
    return this.http.get(`${this.baseUrl}/period/${period}/${id}`);
  }
  updatePeriod(period: number, subject: string, id: number, timetable: TimeTable): Observable<Response> {
    return this.http.put(`${this.baseUrl}/${period}/${subject}/${id}`, timetable);
  }
  getTimeTableId(roomNo: number, day: string): Observable<Response> {
    return this.http.get(`${this.baseUrl}/${roomNo}/${day}`);
  }
}
