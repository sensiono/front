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

  // Request a password reset
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/auth/forget-password', { email });
  }

  // Reset password using the provided token
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/auth/reset-password', {
      token,
      newPassword,
    });
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

  isUserAdmin(): boolean {
    const decodedJwt = this.getDecodedJwtData(); // Decode JWT
    if (decodedJwt && decodedJwt.role) {
      console.log("User Role:", decodedJwt.role);
  
      // If 'role' is a string, check if it's 'Admin'
      if (typeof decodedJwt.role === 'string') {
        return decodedJwt.role === 'Admin';
      }
  
      // If 'role' is an array, check if 'Admin' is in the array
      if (Array.isArray(decodedJwt.role)) {
        return decodedJwt.role.includes('Admin');
      }
    }
    return false; // If no role or not admin
  }

  

  // Check if the user is authenticated
  isUserAuthenticated(): boolean {
    return !!localStorage.getItem('jwt'); // Check if there's a JWT in local storage
  }

  // Get the user's role from the JWT
  getUserRole(): string | null {
    const decodedJwt = this.getDecodedJwtData();
    return decodedJwt?.role ?? null;
  }

  getUserid(): string | null {
    const decodedJwt = this.getDecodedJwtData();
    return decodedJwt?.id ?? null;
  }

}
