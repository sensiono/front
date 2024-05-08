import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question';

@Injectable({providedIn: 'root'})
export class QuestionService {
  private apiServerUrl = "http://localhost:9090/khademni";

  constructor(private http: HttpClient){}

  public getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiServerUrl}/questions/retrieve-all-questions`);
  }

  public addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiServerUrl}/questions/add-question`, question);
  }

  public updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiServerUrl}/questions/update-question`, question);
  }

  public deleteQuestion(question_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/questions/remove-question/${question_id}`);
  }

  public retrieveQuestion(question_id: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiServerUrl}/questions/retrieve-question/${question_id}`);
  }





  
  
}