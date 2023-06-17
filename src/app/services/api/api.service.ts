import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  access_key = '9ccb2bddaa00ea969b416b85';
  apiUrl = `https://v6.exchangerate-api.com/v6/${this.access_key}/pair/`;

  constructor(private http: HttpClient) {}

  getCountries(obj: any): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/${obj.from}/${obj.to}/${obj.amount}`
    );
  }
}
