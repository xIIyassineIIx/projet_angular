import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConnexionService } from '../../../service/connexion.service';
import { Connexion } from '../../../class/connexion';
import { ConnecterService } from '../../../service/connecter.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  
  
  connexionservice:ConnexionService=inject(ConnexionService)
  connecterservice:ConnecterService=inject(ConnecterService)
  compte!:Connexion
  compteform!:FormGroup;
  ngOnInit(): void {
    if(this.connecterservice.avoir()!=null)
      this.compte=this.connecterservice.avoir() as Connexion;

    this.compteform=new FormGroup({
      id: new FormControl(this.compte.id),
      name: new FormControl(this.compte.name),
      last: new FormControl(this.compte.last),
      mail: new FormControl(this.compte.mail),
      motDePasse: new FormControl(this.compte.motDePasse)
    })
    
  }


  update() {
    this.connexionservice.putclient(this.compteform.value).subscribe(data=>console.log(data))
    localStorage.setItem("personne",JSON.stringify(this.compteform.value))
  }

}
