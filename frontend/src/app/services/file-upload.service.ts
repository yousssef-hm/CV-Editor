import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = 'http://localhost:8080/api/upload';  // ✅ CHANGÉ : /upload au lieu de /files

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    // ✅ POST vers /api/upload (plus /upload à la fin)
    return this.http.post(this.apiUrl, formData);
  }

  deleteFile(fileName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${fileName}`);
  }
}