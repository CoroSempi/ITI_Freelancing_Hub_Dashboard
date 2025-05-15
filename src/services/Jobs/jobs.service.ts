import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  // our base api url
  private baseUrl = 'https://iti-freelancing-hub-server.vercel.app/dashboard';

  //unseen requests counter
  private unseenRequestsSubject = new BehaviorSubject<number>(0);
  unseenRequests$ = this.unseenRequestsSubject.asObservable();

  constructor(private http: HttpClient) {}

  setUnseenRequests(count: number) {
    this.unseenRequestsSubject.next(count);
  }

  // all jobs
  getAllJobs(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.get<any>(`${this.baseUrl}/jobs`, { headers });
  }

  // get job by ID
  getJobById(jobId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.get<any>(`${this.baseUrl}/jobs/${jobId}`, {
      headers,
    });
  }

  // delete job
  deleteJobById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });

    return this.http.delete(`${this.baseUrl}/jobs/${id}`, {
      headers,
    });
  }

  // add comment
  addCommentToJob(
    jobId: string,
    commentData: { content: string; rate: number }
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.post<any>(
      `${this.baseUrl}/addComment/${jobId}`,
      commentData,
      { headers }
    );
  }

  //delete comment
  deleteComment(jobId: string, commentId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });

    return this.http.delete<any>(`${this.baseUrl}/deleteComment/${jobId}`, {
      headers,
      body: { commentID: commentId },
    });
  }

  //make job verified
  acceptJob(id: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.post(`${this.baseUrl}/approveJob/${id}`, {}, { headers });
  }
}
