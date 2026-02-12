import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CV, Formation, Experience, Stage, Langue, Competence } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private apiUrl = 'http://localhost:8080/api/cvs';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  createCV(userId: number, cv: CV): Observable<CV> {
    return this.http.post<CV>(`${this.apiUrl}/user/${userId}`, cv, this.httpOptions);
  }

  getCVById(id: number): Observable<CV> {
    return this.http.get<CV>(`${this.apiUrl}/${id}`);
  }

  getCVsByUserId(userId: number): Observable<CV[]> {
    return this.http.get<CV[]>(`${this.apiUrl}/user/${userId}`);
  }

  updateCV(id: number, cv: CV): Observable<CV> {
    return this.http.put<CV>(`${this.apiUrl}/${id}`, cv, this.httpOptions);
  }

  deleteCV(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addFormation(cvId: number, formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.apiUrl}/${cvId}/formations`, formation, this.httpOptions);
  }

  addExperience(cvId: number, experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(`${this.apiUrl}/${cvId}/experiences`, experience, this.httpOptions);
  }

  addStage(cvId: number, stage: Stage): Observable<Stage> {
    return this.http.post<Stage>(`${this.apiUrl}/${cvId}/stages`, stage, this.httpOptions);
  }

  addLangue(cvId: number, langue: Langue): Observable<Langue> {
    return this.http.post<Langue>(`${this.apiUrl}/${cvId}/langues`, langue, this.httpOptions);
  }

  addCompetence(cvId: number, competence: Competence): Observable<Competence> {
    return this.http.post<Competence>(`${this.apiUrl}/${cvId}/competences`, competence, this.httpOptions);
  }
}