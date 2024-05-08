import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  baseUrl = 'http://localhost:9090/';

  constructor(private http: HttpClient) {}

  getAllSkills(): Observable<any> {
    return this.http.get(this.baseUrl + 'allSkills');
  }
}
