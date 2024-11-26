import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Produit } from '../../class/produit';
import { ProduitService } from '../../service/produit.service';
import { Commentaire } from '../../class/commentaire';
import { ConnecterService } from '../../service/connecter.service';
import { Connexion } from '../../class/connexion';
import { CommentaireService } from '../../service/commentaire.service';
import { ConnexionService } from '../../service/connexion.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ConvertirePipe } from "../../pipe/convertire.pipe";
import { CouvrerPipe } from '../../pipe/couvrer.pipe';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  ok:boolean=false;
vanish() {
  this.ok=true;
}
  
}
