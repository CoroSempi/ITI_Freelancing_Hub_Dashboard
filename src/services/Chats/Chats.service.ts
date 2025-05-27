import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private baseUrl = ' https://iti-freelancing-hub-server.vercel.app/dashboard';

  private unreadCountSubject = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCountSubject.asObservable();

  setUnseenRequests(count: number) {
    this.unreadCountSubject.next(count);
  }

  constructor(private http: HttpClient) {
    this.updateUnreadCount();
  }

  getAllChats(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });

    return this.http.get<any>(`${this.baseUrl}/getChats`, { headers });
  }

  private updateUnreadCount() {
    this.getAllChats().subscribe((response) => {
      let counter = 0;
      response.forEach((std: any) => {
        std.ChatRoom.forEach((msg: any) => {
          if (msg.received === false && msg.seen === false) {
            counter += 1;
          }
        });
      });

      this.unreadCountSubject.next(counter);
    });
  }

  getChatByID(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    this.updateUnreadCount();
    return this.http.get<any>(`${this.baseUrl}/getChat/${id}`, { headers });
  }

  sendMessage(message: {
    studentID: string;
    content: string;
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });

    return this.http.post<any>(`${this.baseUrl}/sendMessage`, message, {
      headers,
    });
  }
}
