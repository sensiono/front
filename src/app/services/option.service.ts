import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { CustomOption } from '../Models/CustomOption';


@Injectable({
  providedIn: 'root',
})
export class OptionService {
  private apiServerUrl = 'http://localhost:8084/khademni';

  constructor(private http: HttpClient, private authService: AuthServiceService) {}

  private getHeaders(): HttpHeaders {
    const jwt = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    });
  }

  public getOptions(): Observable<CustomOption[]> {
    return this.http.get<CustomOption[]>(`${this.apiServerUrl}/options/retrieve-all-options`, { headers: this.getHeaders() });
  }

  public addOption(option: CustomOption): Observable<CustomOption> {
    return this.http.post<CustomOption>(`${this.apiServerUrl}/options/add-option`, option, { headers: this.getHeaders() });
  }

  public createOptionForQuestion(option: CustomOption, question_id: number): Observable<CustomOption> {
    return this.http.post<CustomOption>(`${this.apiServerUrl}/options/create-option-for-question/${question_id}`, option, { headers: this.getHeaders() });
  }

  public updateOption(option: CustomOption): Observable<CustomOption> {
    return this.http.put<CustomOption>(`${this.apiServerUrl}/options/update-option`, option, { headers: this.getHeaders() });
  }

  public deleteOption(option_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/options/remove-option/${option_id}`,{ headers: this.getHeaders() } );
  }
}
