import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllJobsService {
  private baseUrl = 'https://iti-freelancing-hub-server.vercel.app';

  constructor(private http: HttpClient) {}

  // Get details of a specific job by ID
  getJobById(jobId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.get<any>(`${this.baseUrl}/dashboard/jobs/${jobId}`, {
      headers,
    });
  }

  // Get all jobs
  getAllJobs(endpoint: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`, { headers });
  }
  //  delete job
  deleteJobById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });

    return this.http.delete(`${this.baseUrl}/dashboard/jobs/${id}`, {
      headers,
    });
  }

  // add comments
  addCommentToJob(
    jobId: string,
    commentData: { content: string; rate: number }
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });

    return this.http.post<any>(
      `${this.baseUrl}/dashboard/addComment/${jobId}`,
      commentData,
      { headers }
    );
  }

  deleteComment(jobId: string, commentId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });

    return this.http.delete<any>(
      `${this.baseUrl}/dashboard/deleteComment/${jobId}`,
      { headers, body: { commentID: commentId } }
    );
  }

  //make job verified
  acceptJob(id: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    });
    return this.http.post(
      `${this.baseUrl}/dashboard/approveJob/${id}`,
      {},
      { headers }
    );
  }
}
