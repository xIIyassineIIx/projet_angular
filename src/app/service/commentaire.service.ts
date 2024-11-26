import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from '../class/commentaire';
const url = "http://localhost:3001/commentaire"
@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  public deleteproduit(id: string):Observable<Commentaire> {
    return this.http.delete<Commentaire>(url+"/"+id);
  }
  private http: HttpClient = inject(HttpClient);
  public getcommentaire(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(url);
  }
  public addcommentaire(c: Commentaire): Observable<Commentaire> {
    return this.http.post<Commentaire>(url, c);
  }
}
