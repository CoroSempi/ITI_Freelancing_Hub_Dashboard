import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CertificatesService {
  // our base api url
  private baseUrl = 'https://iti-freelancing-hub-server.vercel.app/dashboard';

  //unseen certificates counter
  private unseenCertificatesSubject = new BehaviorSubject<number>(0);
  unseenCertificates$ = this.unseenCertificatesSubject.asObservable();

  constructor(private http: HttpClient) {}

  setUnseenCertificates(count: number) {
    this.unseenCertificatesSubject.next(count);
  }

  // all certificates
  getAllCertificates(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.get<any>(`${this.baseUrl}/certificate`, { headers });
  }

  // get certificate by ID
  getCertificateById(cerId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.get<any>(`${this.baseUrl}/certificate/${cerId}`, {
      headers,
    });
  }

  // delete certificate
  deleteCertificateById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });

    return this.http.delete(`${this.baseUrl}/certificate/${id}`, {
      headers,
    });
  }

  //make certificate verified
  acceptCertificate(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.post(`${this.baseUrl}/certificate/${id}`, {}, { headers });
  }
}
