import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISpicificUsers } from '../../interfaces/i-spicific-users';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'https://iti-freelancing-hub-server.vercel.app/dashboard';
 
  constructor(private http: HttpClient) { }
 
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('AccessToken')}`
    });
  }

  searchUsers(keyword: string): Observable<ISpicificUsers[]> {
    const headers = this.getHeaders();
    let params = new HttpParams();
   
    if (keyword) {
      params = params.set('keyword', keyword);
    }
    return this.http.get<ISpicificUsers[]>(`${this.baseUrl}/search`, {
      headers,
      params
    });
  }

  sendSpecificNotification(notificationContent: string, userIds: string[]): Observable<any> {
    const headers = this.getHeaders();
    const payload = {
      content: notificationContent,
      title: 'Notification for specific User',
      studentsIDs: userIds,
    };
   
    return this.http.post(`${this.baseUrl}/sendNotification`, payload, {headers});
  }

  sendBroadcastNotification(content: string, trackName: string): Observable<any> {
    const headers = this.getHeaders();
    const payload = {
      trackName: trackName,
      title: "testing", // Using the hardcoded title as per your original code
      content: content,
    };
   
    return this.http.post(`${this.baseUrl}/broadcastingNotification`, payload, { headers });
  }
}