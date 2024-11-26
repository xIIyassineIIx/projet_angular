import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Produit } from '../../class/produit';
import { ProduitService } from '../../service/produit.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  produitservice: ProduitService = inject(ProduitService);
  listproduit: string[] = [];
  ngOnInit(): void {
    this.produitservice.getproduit().subscribe(data => data.forEach(val=>{
      if(!this.listproduit.find(x=>x==val.categorie)){
        this.listproduit.push(val.categorie)
      }
    }));
  }

}
