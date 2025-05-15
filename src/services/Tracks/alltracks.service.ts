import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  private baseUrl = 'https://iti-freelancing-hub-server.vercel.app/dashboard';

  constructor(private http: HttpClient) {}
  getAllTracks(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.get(`${this.baseUrl}/allTracks`, { headers });
  }
  getTrackById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Track/${id}`);
  }
  addTrack(track: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.post(`${this.baseUrl}/addTrack`, track, { headers });
  }

  deleteTrack(id: String): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    console.log(this.baseUrl + '/Track/' + id);
    return this.http.delete<any>(this.baseUrl + '/Track/' + id, {
      headers,
    });
  }

  getStudentsTrack(id: String): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.get<any>(this.baseUrl + '/Track/' + id, {
      headers,
    });
  }
}
