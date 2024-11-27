import { Component, OnInit, inject } from '@angular/core';
import { CommandeService } from '../../service/commande.service';
import { Commande } from '../../class/commande';
import { Connexion } from '../../class/connexion';
import { ConnecterService } from '../../service/connecter.service';
import { FormsModule, NgModel } from '@angular/forms';
import { ConvertirePipe } from "../../pipe/convertire.pipe";

@Component({
  selector: 'app-pannier-admin',
  standalone: true,
  imports: [FormsModule, ConvertirePipe],
  templateUrl: './pannier-admin.component.html',
  styleUrl: './pannier-admin.component.css'
})
export class PannierADMINComponent implements OnInit{

  
    
    identifiant!:string
    commade_list:Commande[]=[];
    commandeservice:CommandeService=inject(CommandeService);
    ngOnInit(): void {
      this.commandeservice.getcommandes().subscribe(data=>{
        return this.commade_list=data
    })
      
    }
    modifier(id:string,slt:any) {
  console.log(slt.value)
  this.commade_list.map(x=>{
    if(x.id==id){
      x.statut=slt.value;
    }
  })
  this.commandeservice.putcommande(this.commade_list.find(x=>x.id==id) as Commande).subscribe();
}
  delet(id: string) {
    this.commandeservice.deletecommande(id).subscribe()
    this.commade_list=this.commade_list.filter(x=>x.id!=id);
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
    
      
  
}
