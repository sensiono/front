import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from './auth-service.service';
import { Test } from '../Models/test';
import { Question } from '../Models/question';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiServerUrl = 'http://localhost:8084/khademni';

  constructor(private http: HttpClient, private authService: AuthServiceService) {}

  private getHeaders(): HttpHeaders {
    const jwt = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    });
  }

  public getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiServerUrl}/tests/retrieve-all-tests`, { headers: this.getHeaders() });
  }

  public createTestWithQuestionsAndOptions(test: Test): Observable<Test> {
    return this.http.post<Test>(`${this.apiServerUrl}/tests/create-test`, test, { headers: this.getHeaders() });
  }

  public updateTest(test_id: number, test: Test): Observable<Test> {
    return this.http.put<Test>(`${this.apiServerUrl}/tests/update-test/${test_id}`, test, { headers: this.getHeaders() });
  }

  public deleteTest(test_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tests/remove-test/${test_id}`, { headers: this.getHeaders() });
  }

  public retrieveTest(test_id: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiServerUrl}/tests/retrieve-test/${test_id}`, { headers: this.getHeaders() });
  }

  public getTestQuestions(test_id: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiServerUrl}/tests/${test_id}/questions`, { headers: this.getHeaders() });
  }

  public updateQuestionInTest(test_id: number, question_id: number): Observable<Question[]> {
    return this.http.put<Question[]>(`${this.apiServerUrl}/tests/update-test/${test_id}/questions/${question_id}`, null, { headers: this.getHeaders() });
  }
}
