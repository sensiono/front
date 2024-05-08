import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

const BASIC_URL = 'http://localhost:8084/';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient, private authService: AuthServiceService) {}

  // Get Authorization Headers
  private getHeaders(): HttpHeaders {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      console.warn('You must be logged in to comment.');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    });
  }

  createComment(blogId: number, postedBy: string, content: string): Observable<any> {
    const params = {
      blogId,
      postedBy,
    };
    return this.http.post(`${BASIC_URL}api/comments/create`, { content }, { params, headers: this.getHeaders() });
  }

  getAllCommentsByBlog(blogId: number): Observable<any> {
    return this.http.get(`${BASIC_URL}api/comments/${blogId}`, { headers: this.getHeaders() });
  }

  deleteComment(blogId: number, commentId: number): Observable<any> {
    return this.http.delete(`${BASIC_URL}api/blogs/${blogId}/comments/${commentId}`);
  }

}
