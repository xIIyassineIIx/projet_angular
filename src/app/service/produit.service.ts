import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../class/produit';

const url = "http://localhost:3000/produit"
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private http: HttpClient = inject(HttpClient);

  public getproduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(url);
  }
  public postproduit(p:Produit): Observable<Produit> {
    return this.http.post<Produit>(url,p);
  }
  public putproduit(p:Produit): Observable<Produit> {
    return this.http.put<Produit>(`${url}/${p.id}`,p);
  }
  public deleteproduit(id: string): Observable<any> {
    return this.http.delete(`${url}/${id}`);
  }
}
