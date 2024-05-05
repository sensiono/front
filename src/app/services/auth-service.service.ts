import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8084/'; // Corrected base URL variable

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  // Registration service
  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/auth/register', signRequest);
  }

  // Login service
  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/auth/authenticate', loginRequest);
  }

  // Logout service
  logout(): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/auth/logout', null);
  }

  // Get decoded JWT data
  getDecodedJwtData(): any {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const jwtData = jwt.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      return JSON.parse(decodedJwtJsonData);
    }

    return null; // Return null if JWT doesn't exist
  }

  // Check if the user is an admin
  isUserAdmin(): boolean {
    const decodedJwt = this.getDecodedJwtData(); // Get decoded JWT data
    if (decodedJwt && decodedJwt.role) {
      return decodedJwt.role.includes('Admin'); // Check if the user has the Admin role
    }

    return false; // If no role or user is not an admin
  }

  // Check if the user is authenticated
  isUserAuthenticated(): boolean {
    return !!localStorage.getItem('jwt'); // Check if there's a JWT in local storage
  }
}
