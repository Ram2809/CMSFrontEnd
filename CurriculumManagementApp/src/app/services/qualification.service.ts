import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Qualification } from '../model/qualification';
import { UrlUtil } from '../model/url-util';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  public urlUtil: UrlUtil = new UrlUtil();
  private baseUrl = this.urlUtil.baseUrl + 'qualification';
  constructor(private http: HttpClient) { }
  addQualification(qualification: Qualification): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, qualification);
  }
  getQualifications(): Observable<Response> {
    return this.http.get(`${this.baseUrl}`);
  }
  deleteQualification(qualificationId: number): Observable<Response> {
    return this.http.delete(`${this.baseUrl}/${qualificationId}`);
  }
}
