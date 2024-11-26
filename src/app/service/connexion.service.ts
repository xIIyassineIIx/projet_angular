import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Connexion } from '../class/connexion';
import {Observable } from 'rxjs';
const url = "http://localhost:3002/connexion"
@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  
  private http: HttpClient = inject(HttpClient)
  deletecompte(id: string) :Observable<any>{
      return this.http.delete(`${url}/${id}`);
  }
  public check(): Observable<Connexion[]> {
    return this.http.get<Connexion[]>(url);
  }
  public addclient(x: Connexion): Observable<Connexion> {
    return this.http.post<Connexion>(url, x);
  }
  public putclient(x:Connexion):Observable<any>{
    return this.http.put(`${url}/${x.id}`,x);
  }
}
