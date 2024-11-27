import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProduitService } from '../../service/produit.service';
import { Produit } from '../../class/produit';
import { NgClass } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ConvertirePipe } from '../../pipe/convertire.pipe';

@Component({
  selector: 'app-list-produit',
  standalone: true,
  imports: [NgClass, RouterLink,FormsModule,ConvertirePipe],
  templateUrl: './list-produit.component.html',
  styleUrl: './list-produit.component.css'
})
export class ListProduitComponent implements OnInit {

  rangeValue: number=0;
  dispo:string="true"
  tab: Produit[] = [];
  tab1: Produit[] = [];
  produitservice: ProduitService = inject(ProduitService);
  categorie!: string;
  activatedRoute: ActivatedRoute=inject(ActivatedRoute);
  max:number=0;
  min: number=0;
  tab2!: Produit[];
  ngOnInit() {
    this.categorie = this.activatedRoute.snapshot.params['categorie'];
    if(this.categorie!=undefined){
      this.produitservice.getproduit().subscribe(data => {
        this.max=Math.max(...data.map(x=>x.prix))
        this.min=Math.min(...data.map(x=>x.prix))
      return this.tab = data.filter(x=>x.categorie==this.categorie),this.tab1=data;

    });
    }else{
      this.produitservice.getproduit().subscribe(data => {
        this.max=Math.max(...data.map(x=>x.prix))
        this.min=Math.min(...data.map(x=>x.prix))
        
        return this.tab = data,this.tab1=data;
  
      });
      
    
    
    }
   
   
  }
  onrange(){
    this.Filters()
  }
  onchange() {
    this.Filters()
  }
  Filters() {
    this.tab = this.tab1.filter(x => {
      let range = x.prix > this.rangeValue;
      let disponibilite = String(x.disponibilite) == this.dispo;
      console.log(disponibilite)
      return range && disponibilite;
    });
  }

}
