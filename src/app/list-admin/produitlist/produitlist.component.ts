import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produit } from '../../class/produit';
import { ProduitService } from '../../service/produit.service';
import { ConvertirePipe } from '../../pipe/convertire.pipe';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-produitlist',
  standalone: true,
  imports: [ConvertirePipe,JsonPipe,ReactiveFormsModule],
  templateUrl: './produitlist.component.html',
  styleUrl: './produitlist.component.css'
})
export class ProduitlistComponent {
  produit: Produit[] = [];
  cat: any;
  id!:string
  identifiant!:string
  nouveauproduit!: FormGroup
  produitservice: ProduitService = inject(ProduitService);
  listproduit: string[]=[];
  ngOnInit(): void {
    this.nouveauproduit = new FormGroup({
      id: new FormControl('', Validators.required ),
      nom: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      prix: new FormControl(0, [Validators.required, Validators.min(0)]),
      categorie: new FormControl('', Validators.required),
      disponibilite: new FormControl(true),
      photoUrl: new FormControl('', [Validators.required, Validators.pattern("(.)+(jpg|png)$")]),
      date:new FormControl(new Date().toISOString().split("T")[0]),
      specification: new FormGroup({
        processeur: new FormControl('',),
        ram: new FormControl('',),
        stockage: new FormControl('', ),
        carteGraphique: new FormControl('',),
        systemeExploitation: new FormControl('', )
      })
    })
    this.produitservice.getproduit().subscribe(data =>{
      this.nouveauproduit.get("id")?.setValue(String(Number(data[data.length-1].id)+1))
      this.produit = data
      data.forEach(val=>{
        if(!this.listproduit.find(x=>x==val.categorie)){
          this.listproduit.push(val.categorie)
        }
      })
    } );
    
    
  }
  
  
  public get produitid() {
    return this.nouveauproduit.get("id")
  }
  public get produitnom() {
    return this.nouveauproduit.get("nom")
  }
  public get produitdis() {
    return this.nouveauproduit.get("description")
  }
  public get produitphoto() {
    return this.nouveauproduit.get("photoUrl")
  }
  public get produitprix() {
    return this.nouveauproduit.get("prix")
  }
  public get produitcategorie() {
    return this.nouveauproduit.get("categorie")
  }
  prixvalid() {
    return this.produitprix?.errors?.["min"];
  }
  selectvalid() {
    return this.produitcategorie?.value == "null"
  }
  delet(id: string) {
    this.produitservice.deleteproduit(id).subscribe()
    this.produit = this.produit.filter(x => x.id != id)
  }
  p!: Produit;
  update(id: string) {
    this.p = this.produit.find(x => x.id == id) as Produit;
    this.nouveauproduit.setValue({
      id: this.p.id,
      nom: this.p.nom,
      description: this.p.description,
      prix: this.p.prix,
      categorie: this.p.categorie,
      disponibilite: this.p.disponibilite,
      photoUrl: this.p.photoUrl,
      date:this.p.date,
      specification: {
        processeur: this.p.specification?.processeur,
        ram: this.p.specification?.ram,
        stockage: this.p.specification?.stockage,
        carteGraphique: this.p.specification?.carteGraphique,
        systemeExploitation: this.p.specification?.systemeExploitation
      }
    });
    
  }
  onsubmit() {
    if(this.produit.find(x=>x.id==this.nouveauproduit.get("id")?.value)){
      this.produitservice.putproduit(this.nouveauproduit.value).subscribe()
      this.produit[this.produit.findIndex((x=>x.id==this.nouveauproduit.get("id")?.value))]=this.nouveauproduit.value
    }else{
      this.produitservice.postproduit(this.nouveauproduit.value).subscribe()
      this.produit.push(this.nouveauproduit.value);
      
    }
    this.nouveauproduit.reset()
    this.nouveauproduit.get("id")?.setValue(String(Number(this.produit[this.produit.length-1].id)+1))
    this.nouveauproduit.get("date")?.setValue(new Date().toISOString().split("T")[0])
      
    
  }
  oncahge(ev: Event) {
    this.cat = (ev.target as HTMLSelectElement).value;

  }
  alert(id:string) {
    let elem=document.getElementById("alert") as HTMLBaseElement;
    elem.style.display="block"
    this.identifiant=id;
  }
  confirmer() {
  this.delet(this.identifiant)
  let elem=document.getElementById("alert") as HTMLBaseElement;
  elem.style.display="none"
  }
  annuler() {
    let elem=document.getElementById("alert") as HTMLBaseElement;
    elem.style.display="none"
  }
  
    
}
