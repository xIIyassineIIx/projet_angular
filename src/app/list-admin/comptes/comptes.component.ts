import { Component, OnInit, inject } from '@angular/core';
import { ConnexionService } from '../../service/connexion.service';
import { Connexion } from '../../class/connexion';
import { CouvrerPipe } from "../../pipe/couvrer.pipe";

@Component({
  selector: 'app-comptes',
  standalone: true,
  imports: [CouvrerPipe],
  templateUrl: './comptes.component.html',
  styleUrl: './comptes.component.css'
})
export class ComptesComponent implements OnInit{

  
  




  
  prod: boolean = false;
  comm: boolean = false;
  comp: boolean = false;

  comptes: Connexion[] = [];
  connexionservice: ConnexionService = inject(ConnexionService);
  identifiant!: string;
  
    ngOnInit(): void {
    this.connexionservice.check().subscribe(data=>this.comptes=data)
  }
  
  
  alert(id:string) {
    let elem=document.getElementById("alert") as HTMLBaseElement;
    elem.style.display="block"
    this.identifiant=id;
  }
  confirmer() {
  this.delet(this.identifiant)
  let elem=document.getElementById("alert") as HTMLBaseElement;
  elem.style.display="none"
  }
  annuler() {
    let elem=document.getElementById("alert") as HTMLBaseElement;
    elem.style.display="none"
  }
  affiche($event: MouseEvent, ch: string) {
    ($event.target as HTMLSelectElement).innerHTML = ch;
  }
  delet(id: string) {
    this.connexionservice.deletecompte(id).subscribe()
    this.comptes = this.comptes.filter(x => x.id != id)
  }
}
