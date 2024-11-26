import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProduitService } from '../../service/produit.service';
import { Produit } from '../../class/produit';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list-produit',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './list-produit.component.html',
  styleUrl: './list-produit.component.css'
})
export class ListProduitComponent implements OnInit {
  tab: Produit[] = [];
  produitservice: ProduitService = inject(ProduitService);
  categorie!: string;
  activatedRoute: ActivatedRoute=inject(ActivatedRoute);
  ngOnInit() {
    this.categorie = this.activatedRoute.snapshot.params['categorie'];
      console.log(this.categorie)
    if(this.categorie!=undefined){
      this.produitservice.getproduit().subscribe(data => {
      return this.tab = data.filter(x=>x.categorie==this.categorie);

    });
    }else{
      this.produitservice.getproduit().subscribe(data => {
        return this.tab = data;
  
      });
    }
   
  }

}
