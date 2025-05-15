import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IuserSign } from '../../interfaces/iuser-sign';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://iti-freelancing-hub-server.vercel.app/dashboard';

  constructor(private http: HttpClient) {}

  signIn(user: IuserSign): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.baseUrl + '/signin', user, { headers });
  }

  sendCode(email: String): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(
      this.baseUrl + '/forgetPassword',
      { email },
      {
        headers,
      }
    );
  }

  verifyCode({
    email,
    code,
  }: {
    email: string;
    code: string;
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(
      this.baseUrl + '/verifyCode',
      { email, code },
      {
        headers,
      }
    );
  }

  resetPassword(newPassword: String): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });

    return this.http.post<any>(
      this.baseUrl + '/resetPassword',
      { newPassword },
      {
        headers,
      }
    );
  }

  changePassword(body: {
    currentPassword: string;
    newPassword: string;
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });

    return this.http.patch<any>(this.baseUrl + '/changePassword', body, {
      headers,
    });
  }

  checkToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });

    return this.http.get<any>(this.baseUrl + '/checkToken', {
      headers,
    });
  }
}
