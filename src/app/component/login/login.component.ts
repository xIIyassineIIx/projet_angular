import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConnexionService } from '../../service/connexion.service';
import { Connexion } from '../../class/connexion';
import { Router } from '@angular/router';
import { ConnecterService } from '../../service/connecter.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  alert!: string;
  id: string = "";
  ok: boolean = false;
  etat: string = "Sign In"
  connexion!: FormGroup;
  connexionservice: ConnexionService = inject(ConnexionService);
  connecterservice: ConnecterService = inject(ConnecterService);
  comptes: Connexion[] = [];
  router: Router = inject(Router);


  ngOnInit(): void {
    this.connexionservice.check().subscribe(data => {
      return this.comptes = data, this.id = String(Number(data[data.length - 1].id) + 1)
    })
    this.connexion = new FormGroup({
      id: new FormControl(""),
      name: new FormControl("",Validators.required),
      last: new FormControl("",Validators.required),
      mail: new FormControl("" ,Validators.email),
    motDePasse: new FormControl("",Validators.pattern("[A-Za-z*/_]+"))
    })
  }
  public get email(){
    return this.connexion.get("mail")
  }
  public get motDePasse(){
    return this.connexion.get("motDePasse")
  }
  public get nom(){
    return this.connexion.get("name")
  }
  public get prenom(){
    return this.connexion.get("last")
  }
  onsubmit() {
    // if (!(this.ok)) {
    //   if (this.comptes.some(x => x.mail == this.connexion.value["mail"] && x.motDePasse == this.connexion.value["motDePasse"])) {
    //     this.router.navigate(["/accueil"])
    //     this.connecterservice.ajouter(this.comptes.find(x => x.mail == this.connexion.value["mail"] && x.motDePasse == this.connexion.value["motDePasse"]) as Connexion);
    //   }
    //   else {
    //     this.alert = "verifier les parametres donnée"
    //   }
    // } else {
    //   this.connexion.get("id")?.setValue(this.id);
    //   this.comptes.push(this.connexion.value)
    //   this.connexionservice.addclient(this.connexion.value).subscribe()
    //   this.router.navigate(["/accueil"])
    //   this.connecterservice.ajouter(this.comptes.find(x => x.mail == this.connexion.value["mail"] && x.motDePasse == this.connexion.value["motDePasse"]) as Connexion);
    // }
      this.connexion.get("id")?.setValue(this.id);
    if (!(this.ok)) {
    this.connecterservice.verifier(this.connexion.value).subscribe(data=>{
      if(data){
        this.router.navigate(["/accueil"]);
      }else{
        this.router.navigate(["/login"]);
        this.alert = "verifier les parametres donnée"
      }
    })
      } else {
        this.comptes.push(this.connexion.value)
        this.connexionservice.addclient(this.connexion.value).subscribe()
        this.ok = false;
        this.connexion.reset();
      }
  }
  onclick() {
    this.ok = true;
    this.etat = "Sign Up"

  }
}
