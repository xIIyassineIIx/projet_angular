import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from '../../class/produit';
import { ProduitService } from '../../service/produit.service';
import { RemisePipe } from '../../pipe/remise.pipe';
import { Commentaire } from '../../class/commentaire';
import { CommentaireService } from '../../service/commentaire.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConnexionService } from '../../service/connexion.service';
import { Connexion } from '../../class/connexion';
import { ConnecterService } from '../../service/connecter.service';
import { ConvertirePipe } from '../../pipe/convertire.pipe';
import { Commande } from '../../class/commande';
import { CommandeService } from '../../service/commande.service';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [RemisePipe, ReactiveFormsModule,ConvertirePipe],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit {

  identifiant!: string;
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  produit!: Produit;
  produitservice: ProduitService = inject(ProduitService);
  commentaire: Commentaire[] = [];
  connecterservice: ConnecterService = inject(ConnecterService);
  connecter!: Connexion ;
  commentaireservice: CommentaireService = inject(CommentaireService);
  ajoutecommentaire!: FormGroup;
  id!: string;
  commandeservice:CommandeService=inject(CommandeService);
  commade_list:Commande[]=[];
  ngOnInit() {
    this.identifiant = this.activatedRoute.snapshot.params['id'];
    this.produitservice.getproduit().subscribe(data => {
      //console.log(data.filter(x => x.id == this.identifiant)[0].specification?.processeur)
        
      return this.produit = data.filter(x => x.id == this.identifiant)[0]
    });
    this.commentaireservice.getcommentaire().subscribe(data => {
      console.log(data.length)
      return this.commentaire = data.filter(x => x.idproduit == this.identifiant), this.id = String(Number(data[data.length-1].id)+1)

    })

    if(this.connecterservice.avoir()!=null)
        this.connecter=this.connecterservice.avoir() as Connexion;
    this.ajoutecommentaire = new FormGroup({
      id: new FormControl(""),
      nom: new FormControl( "Unconnu"),
      prenom: new FormControl( "Unconnu"),
      message: new FormControl("",[Validators.required]),
      idproduit: new FormControl(),
      dateCreation: new FormControl(new Date().toISOString().split('T')[0])
    })
    this.commandeservice.getcommandes().subscribe(data=>{
      return this.commade_list=data
  })
  }
  onSubmit() {
    if (this.connecter != undefined) {
      this.ajoutecommentaire.get("nom")?.setValue(this.connecter.name)
      this.ajoutecommentaire.get("prenom")?.setValue(this.connecter.last)
    }
    this.ajoutecommentaire.get("id")?.setValue(this.id)
    this.ajoutecommentaire.get("idproduit")?.setValue(this.identifiant);
    this.commentaireservice.addcommentaire(this.ajoutecommentaire.value).subscribe(data => {
      this.commentaire.push(data);
    })
    
  }
  ajouter(qte:string,idp:string) {
    let elem=document.getElementById("horstock") as HTMLBodyElement;
    let elem1=document.getElementById("stock") as HTMLBodyElement;
    if(this.produit.disponibilite){
      let totalp=Number(Number(qte)*this.produit.prix);
    this.commandeservice.setcommandes({id:String(Number(this.commade_list[this.commade_list.length-1].id)+1),idproduit: idp,idclient: this.connecter.id,quantite:Number(qte),date:String (new Date().toISOString().split('T')[0]),statut:"en attend",total:totalp}).subscribe()
    elem1.style.display="block"
    setTimeout(()=>{elem1.style.display="none" },1000)
    }
    else{
      elem.style.display="block"
      setTimeout(()=>{elem.style.display="none" },1000)
      
    
    
    }
     }


}

