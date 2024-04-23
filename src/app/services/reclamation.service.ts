import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Reclamation } from "../models/reclamation";

@Injectable({
    providedIn: 'root'
})
export class ReclamationService {

    private baseUrl = 'http://localhost:9090/reclamation';

    constructor(private http: HttpClient) { }

    getAllReclamations(): Observable<Reclamation[]> {
        return this.http.get<Reclamation[]>(`${this.baseUrl}/allRec`); // Update the endpoint URL
    }

    getReclamationById(id: number): Observable<Reclamation> {
        return this.http.get<Reclamation>(`${this.baseUrl}/getRec/${id}`); // Update the endpoint URL
    }

    saveReclamation(reclamation: Reclamation): Observable<Reclamation> {
        return this.http.post<Reclamation>(`${this.baseUrl}/addRec/1`, reclamation); // Update the endpoint URL
    }

    deleteReclamation(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/deleteRec/${id}`); // Update the endpoint URL
    }
    updateReclamation(reclamation: Reclamation): Observable<Reclamation> {
      return this.http.put<Reclamation>(`${this.baseUrl}/updateRec`, reclamation); // Using PUT instead of POST
  }

}
