import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlUtil } from '../model/url-util';
import { Response } from '../model/response';
import { HttpClient } from '@angular/common/http';
import { Unit } from 'src/app/model/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'unit';
  constructor(private http: HttpClient) { }
  addUnit(unit: Unit): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, unit);
  }
  getUnits(subjectCode: string): Observable<Response> {
    return this.http.get(`${this.baseUrl}` + '/subject/' + `${subjectCode}`);
  }
  deleteUnit(unitNo: string): Observable<Response> {
    return this.http.delete(`${this.baseUrl}` + '/' + `${unitNo}`);
  }
  updateUnit(unitNo: string, unit: Unit): Observable<Response> {
    return this.http.put(`${this.baseUrl}` + '/' + `${unitNo}`, unit);
  }
  getUnit(unitNo: string): Observable<Response> {
    return this.http.get(`${this.baseUrl}` + '?unitNo=' + `${unitNo}`)
  }
  getSubjectByUnit(unitNo: string): Observable<Response> {
    return this.http.get(`${this.baseUrl}` + '/' + `${unitNo}`);
  }
}
