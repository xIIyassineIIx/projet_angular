import { Injectable, inject } from '@angular/core';
import { Connexion } from '../class/connexion';
import { Observable, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const url= "http://localhost:3002/connexion";
@Injectable({
  providedIn: 'root'
})
export class ConnecterService {
  private personne!: Connexion;
  
  private http:HttpClient=inject(HttpClient)
  tab:Connexion[]=[]
  public verifier(x:Connexion):Observable<boolean>{
      return this.http.get<Connexion[]>(url).pipe(
        map(data=>{
        const connecter=data.some(val=>val.mail == x.mail && val.motDePasse ==x.motDePasse)
        this.personne = data.find(val => val.mail == x.mail && val.motDePasse == x.motDePasse) as Connexion;
        localStorage.setItem("personne",JSON.stringify(this.personne))
        return connecter
      }),
      tap(connecter=>{
        if(connecter){
        localStorage.setItem("connexion","connected")
      }
      else{
        localStorage.setItem("connexion","disconnected")
      }
      if(x.mail=="admin@techlab.com" && x.motDePasse=="admin"){
        localStorage.setItem("statut","admin")
      }
      else{
        localStorage.setItem("statut","client")
      }
      })
      
      );
    }
    public logout(){
      localStorage.setItem("connexion","disconnected")
      localStorage.removeItem("personne")
      localStorage.removeItem("statut")
    }
    public avoir(): Connexion | null {
      let personne= localStorage.getItem("personne");
      if(personne){
      try{
        return JSON.parse(personne) as Connexion;
      }
      catch{
        return null;
      }
      
    }
    return null;
  }
  
  
}
