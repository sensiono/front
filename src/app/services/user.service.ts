import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { User } from '../Models/user/user' ;
import { AuthServiceService } from "./auth-service.service";

const AUTH_API = 'http://localhost:8084/api/v1/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};
interface Credentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8084/api/v1/user';

  constructor(private http: HttpClient ,
    private authService: AuthServiceService

  ) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(AUTH_API + 'register', user, httpOptions);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(AUTH_API + 'all');
  }

  deleteUserWithTokens(userId: number): Observable<string> {
    return this.http.delete<string>(`${AUTH_API}users/${userId}`, httpOptions);
  }
  /*

  login(credentials: Credentials): Observable<any> {
    return this.http.post(this.baseUrlLogin + 'authenticate', {
        email: credentials.username,
        password: credentials.password
    }, httpOptions);
}
/*
  authenticate(request: any): Observable<any> {
    console.log('Sending authentication request for user:', request.email);
    return this.http.post<any>(`${AUTH_API}authenticate`, request, httpOptions)
      .pipe(
        tap(_ => console.log('Authentication successful for user:', request.email)),
        catchError(error => {
          console.error('Error occurred during authentication:', error);
          throw error;
        })
      );
  }
*/
  modifyUserProfile(userId: number, request: { oldPassword: string, newPassword?: string, firstname: string, email: string }): Observable<any> {
    const url = `${AUTH_API}profile/${userId}`;
    return this.http.put(url, request, httpOptions);
  }



  private getHeaders(): HttpHeaders {
    const jwt = localStorage.getItem('jwt');

    return new HttpHeaders({
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/current`, { headers: this.getHeaders() });
  }




}
