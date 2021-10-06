import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitStatus } from '../model/unit-status';
import { UrlUtil } from '../model/url-util';
import { Response } from '../model/response';
@Injectable({
  providedIn: 'root'
})
export class UnitStatusService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'unitstatus';
  constructor(private http: HttpClient) { }
  addUnitStatus(unitStatus: UnitStatus): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, unitStatus);
  }
  getUnitstatusByUnitNo(unitNo: string, staffId: number, roomNo: number): Observable<Response> {
    return this.http.get(`${this.baseUrl}/${unitNo}/${staffId}/${roomNo}`);
  }
  deleteUnitStatus(statusId: number): Observable<Response> {
    return this.http.delete(`${this.baseUrl}/${statusId}`);
  }
  updateUnitStatus(statusId: number, unitStatus: UnitStatus): Observable<Response> {
    return this.http.put(`${this.baseUrl}/${statusId}`, unitStatus);
  }
}
