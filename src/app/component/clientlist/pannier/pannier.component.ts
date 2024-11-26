import { Component, OnInit, inject } from '@angular/core';
import { Commande } from '../../../class/commande';
import { CommandeService } from '../../../service/commande.service';
import { Connexion } from '../../../class/connexion';
import { ConnecterService } from '../../../service/connecter.service';
import { RouterLink } from '@angular/router';
import { Produit } from '../../../class/produit';
import { ProduitService } from '../../../service/produit.service';
import { Subscription } from 'rxjs';
import { ConvertirePipe } from '../../../pipe/convertire.pipe';

@Component({
  selector: 'app-pannier',
  standalone: true,
  imports: [RouterLink,ConvertirePipe],
  templateUrl: './pannier.component.html',
  styleUrl: './pannier.component.css'
})
export class PannierComponent implements OnInit{
// prixif(id: string):number {
//   let prix=0;
//    console.log(this.produitservice.getproduit().subscribe(data => {
//     return prix=Number(data.filter(x => x.id == id)[0].prix)
//   }))
//   return 0
// }


produit!: Produit;
produitservice: ProduitService = inject(ProduitService);
  commade_list:Commande[]=[];
  commandeservice:CommandeService=inject(CommandeService);
  personne!:Connexion
  connecterservice: ConnecterService = inject(ConnecterService);
  ngOnInit(): void {
    if(this.connecterservice.avoir()!=null){
      this.personne=this.connecterservice.avoir() as Connexion ;
    }
    
    console.log(this.personne)
    this.commandeservice.getcommandes().subscribe(data=>{
      
      console.log(this.personne.id,data[0].idclient)
      return this.commade_list=data.filter(x=>this.personne.id==x.idclient)
  })
    
  }
diminuer(id:string) {
  this.commade_list.map(x=>{
    if(x.id==id){
      x.total=x.total-(x.total/x.quantite)
      x.quantite--;
    }
  })
  this.commandeservice.putcommande(this.commade_list.find(x=>x.id==id) as Commande).subscribe();
}
augmente(id:string) {
this.commade_list.map(x=>{
    if(x.id==id){
      x.total=x.total+(x.total/x.quantite)
      x.quantite++;
    }
  })
  console.log(this.commade_list.find(x=>x.id==id) as Commande)
  this.commandeservice.putcommande(this.commade_list.find(x=>x.id==id) as Commande).subscribe();
}
delet(id: string) {
  this.commandeservice.deletecommande(id).subscribe()
  this.commade_list=this.commade_list.filter(x=>x.id!=id);
}
}
