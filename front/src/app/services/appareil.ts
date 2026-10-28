import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Appareil } from '../models/appareil.model';

@Injectable({ providedIn: 'root' })
export class AppareilService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAppareils(): Observable<Appareil[]> {
    return this.http.get<Appareil[]>(this.apiUrl);
  }

  getAppareil(id: string): Observable<Appareil> {
    return this.http.get<Appareil>(`${this.apiUrl}/${id}`);
  }

  addAppareil(appareil: Omit<Appareil, '_id'>): Observable<Appareil> {
    return this.http.post<Appareil>(this.apiUrl, appareil);
  }

  updateAppareil(id: string, appareil: Omit<Appareil, '_id'>): Observable<Appareil> {
    return this.http.put<Appareil>(`${this.apiUrl}/${id}`, appareil);
  }

  deleteAppareil(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}