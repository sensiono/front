import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

const BASIC_URL = 'http://localhost:8084/';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient, private authService: AuthServiceService) {}

  // Get Authorization Headers
  private getHeaders(): HttpHeaders {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      console.warn('You must be logged in to perform this action.');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    });
  }

  createNewBlog(data: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/blogs', data, { headers: this.getHeaders() });
  }

 getRankedBlogs(): Observable<any> {
    return this.http.get(`${BASIC_URL}api/blogs/ranked`,{ headers: this.getHeaders() });
  }
  getBlogById(blogId: number): Observable<any> {
    return this.http.get(`${BASIC_URL}api/blogs/${blogId}`, { headers: this.getHeaders() });
  }

  likeBlog(blogId: number): Observable<any> {
    return this.http.put(`${BASIC_URL}api/blogs/${blogId}/like`, {}, { headers: this.getHeaders() });
  }

  searchByName(name: string): Observable<any> {
    return this.http.get(`${BASIC_URL}api/blogs/search/${name}`, { headers: this.getHeaders() });
  }

  deleteBlog(blogId: number): Observable<any> {
    return this.http.delete(`${BASIC_URL}api/blogs/${blogId}`, { headers: this.getHeaders() });
  }

  updateBlog(blogId: number, updatedBlog: any): Observable<any> {
    return this.http.put(`${BASIC_URL}api/blogs/${blogId}`, updatedBlog, { headers: this.getHeaders() });
  }
}
