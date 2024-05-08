import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { Question } from '../Models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiServerUrl = 'http://localhost:9090/khademni';

  constructor(private http: HttpClient, private authService: AuthServiceService) {}

  private getHeaders(): HttpHeaders {
    const jwt = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    });
  }

  public getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiServerUrl}/questions/retrieve-all-questions`, { headers: this.getHeaders() });
  }

  public addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiServerUrl}/questions/add-question`, question, { headers: this.getHeaders() });
  }

  public updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiServerUrl}/questions/update-question`, question, { headers: this.getHeaders() });
  }

  public deleteQuestion(question_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/questions/remove-question/${question_id}`, { headers: this.getHeaders() });
  }

  public retrieveQuestion(question_id: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiServerUrl}/questions/retrieve-question/${question_id}`, { headers: this.getHeaders() });
  }
}
