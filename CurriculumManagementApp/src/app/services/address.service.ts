import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/address';
import { Response } from '../model/response';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = 'http://localhost:8081/api/address'
  constructor(private http: HttpClient) { }
  addAddress(address: Address): Observable<Response> {
    return this.http.post(`${this.baseUrl}`, address);
  }
  getAddress(staffId: number): Observable<Response> {
    return this.http.get(`${this.baseUrl}/${staffId}`);
  }
  updateAddress(id: number, address: Address): Observable<Response> {
    return this.http.put(`${this.baseUrl}/${id}`, address);
  }
}
