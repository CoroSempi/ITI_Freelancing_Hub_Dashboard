import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/User';



@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  private baseUrl = 'https://iti-freelancing-hub-server.vercel.app/dashboard/';

  constructor(private http: HttpClient) { }


  getUsersByTrack(trackId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Track/${trackId}`);
  }
  
  updateUserById(userId: string, userData: any): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
  
    return this.http.put(`${this.baseUrl}/UpdateUser/${userId}`, userData, { headers });
  }
  
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/getUserByID/${userId}`);
  }


}