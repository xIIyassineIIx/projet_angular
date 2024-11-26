import { animate,state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { ProduitService } from '../../service/produit.service';
import { Produit } from '../../class/produit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';
import { ConvertirePipe } from '../../pipe/convertire.pipe';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink,ConvertirePipe],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css',
  animations: [
    trigger('sliderAnimation', [
      state('right', style({ transform: 'translateX(-100%)' })),
      state('left', style({ transform: 'translateX(100%)' })),
      transition('* => *', [animate('500ms ease-in-out')]),
    ]),
  ]
})
export class AccueilComponent implements OnInit {
  
  
  produitservice:ProduitService=inject(ProduitService)
  produit:Produit[]=[]


ngOnInit(): void {
    this.produitservice.getproduit().subscribe(data=>this.produit=data)
  }
}
