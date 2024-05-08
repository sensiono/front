import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Option } from 'src/app/models/option';

@Injectable({providedIn: 'root'})
export class OptionService {
  private apiServerUrl = "http://localhost:9090/khademni";

  constructor(private http: HttpClient){}

  public getOptions(): Observable<Option[]> {
    return this.http.get<Option[]>(`${this.apiServerUrl}/options/retrieve-all-options`);
  }

  public addOption(option: Option): Observable<Option> {
    return this.http.post<Option>(`${this.apiServerUrl}/options/add-option`, option);
  }

  public createOptionForQuestion(option: Option,question_id: number): Observable<Option> {
    return this.http.post<Option>(`${this.apiServerUrl}/options/create-option-for-question/${question_id}`, option);
  }

  public updateOption(option: Option): Observable<Option> {
    return this.http.put<Option>(`${this.apiServerUrl}/options/update-option`, option);
  }

  public deleteOption(option_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/options/remove-option/${option_id}`);
  }
}