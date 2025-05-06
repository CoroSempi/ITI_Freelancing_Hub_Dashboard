import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoundanalisticsService {

  private baseUrl = 'https://iti-freelancing-hub-server.vercel.app/dashboard';

  constructor(private http: HttpClient) {}
  getData(endpoint: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`, {headers});
  }
}


