
import { Evenement } from '../Models/user/evenement';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
 

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  private baseUrl = 'http://localhost:8084/api/evenements'; 
  constructor(private http: HttpClient, private authService: AuthServiceService) { }
  
  private getHeaders(): HttpHeaders {
    const jwt = localStorage.getItem('jwt');

    return new HttpHeaders({
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    });
  }
  
  getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${this.baseUrl}`,{ headers: this.getHeaders() });
  }

  getEvenement(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.baseUrl}/${id}`);
  }

  createEvenement(evenement: Evenement): Observable<Evenement> {
    return this.http.post<Evenement>(`${this.baseUrl}`, evenement,{ headers: this.getHeaders() });
  }

  updateEvenement(id: number, evenement: Evenement): Observable<Evenement> {
    return this.http.put<Evenement>(`${this.baseUrl}/${id}`, evenement);
  }

  
  deleteEvenement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
