import { Component, inject, OnInit } from '@angular/core';
import { Produit } from '../../class/produit';
import { ProduitService } from '../../service/produit.service';
import { Router, RouterLink } from '@angular/router';
import { ConnecterService } from '../../service/connecter.service';
import { Connexion } from '../../class/connexion';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,TitleCasePipe,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
onclick(x:string ) {
  if(x!=""){
    this.routes.navigate(["/produit",x])
  }
}

  produit: Produit[] = [];
  satatut!:string;
  produitservice: ProduitService = inject(ProduitService);
  connecterservice: ConnecterService = inject(ConnecterService);
  routes:Router=inject(Router)
  ch: string = "";
  connecter!: Connexion;
  ngOnInit(): void {
    this.produitservice.getproduit().subscribe(data => this.produit = data)
    
    setInterval(() => {
      this.refrech();
    }, 1000);
  }
  
  refrech() {
    if(this.connecterservice.avoir()!=null){
      this.connecter=this.connecterservice.avoir() as Connexion ;
        this.ch=this.connecter.name+" "+this.connecter.last;
    }
        

      
    this. satatut=localStorage.getItem("statut") as string
  }
  onLogout(){
    this.connecterservice.logout()
    this.routes.navigate(["accueil"]);
  }
  


}
