import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../class/commande';
const url="http://localhost:3003/commande";
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
 

  private http:HttpClient=inject(HttpClient);

  public getcommandes():Observable<Commande[]>{
    return this.http.get<Commande[]>(url);
  }
  public setcommandes(x:Commande):Observable<Commande>{
    return this.http.post<Commande>(url,x);
  }
  public putcommande(x:Commande):Observable<any>{
    return this.http.put(`${url}/${x.id}`,x);

  }
  deletecommande(id: string):Observable<any>{
      return this.http.delete(`${url}/${id}`);
  }

}
