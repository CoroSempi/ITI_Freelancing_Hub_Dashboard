import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private baseUrl = 'https://iti-freelancing-hub-server.vercel.app/dashboard';

  constructor(private http: HttpClient) {}

  getReportData(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.get<any>(`${this.baseUrl}/reportData`, { headers });
  }

  getStatusReport(
    branch: string,
    round: string,
    track: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.get<any>(
      `${this.baseUrl}/statusReport/${branch}/${round}/${track}`,
      { headers }
    );
  }

  getEarningsReport(round: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.get<any>(`${this.baseUrl}/earningsReport/${round}`, {
      headers,
    });
  }

  getFinalReport(branch: string, round: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.get<any>(
      `${this.baseUrl}/finalReport/${branch}/${round}`,
      { headers }
    );
  }
}
