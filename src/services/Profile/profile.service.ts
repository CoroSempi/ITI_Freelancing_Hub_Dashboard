import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'https://iti-freelancing-hub-server.vercel.app/dashboard';

  constructor(private http: HttpClient) {}

  changeAvatar(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.patch(this.baseUrl + '/changeAvatar', formData, {
      headers,
    });
  }
}
